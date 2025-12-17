import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client for auth operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-51fd9f23/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint (for creating the admin account)
app.post("/make-server-51fd9f23/signup", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Sign up error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log(`Sign up error: ${error}`);
    return c.json({ error: "Internal server error during sign up" }, 500);
  }
});

// Get all projects
app.get("/make-server-51fd9f23/projects", async (c) => {
  try {
    const projects = await kv.getByPrefix("project:");
    
    // Sort projects by created date (newest first)
    const sortedProjects = projects.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });
    
    return c.json({ projects: sortedProjects });
  } catch (error) {
    console.log(`Error fetching projects: ${error}`);
    return c.json({ error: "Failed to fetch projects" }, 500);
  }
});

// Create a new project (requires auth)
app.post("/make-server-51fd9f23/projects", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: "Unauthorized - please log in to create projects" }, 401);
    }

    const { title, description, imageUrl, robloxLink } = await c.req.json();
    
    if (!title || !imageUrl) {
      return c.json({ error: "Title and image URL are required" }, 400);
    }

    const projectId = `project:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const project = {
      id: projectId,
      title,
      description: description || "",
      imageUrl,
      robloxLink: robloxLink || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(projectId, project);
    
    return c.json({ success: true, project });
  } catch (error) {
    console.log(`Error creating project: ${error}`);
    return c.json({ error: "Failed to create project" }, 500);
  }
});

// Update a project (requires auth)
app.put("/make-server-51fd9f23/projects/:id", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: "Unauthorized - please log in to update projects" }, 401);
    }

    const projectId = c.req.param('id');
    const { title, description, imageUrl, robloxLink } = await c.req.json();
    
    if (!title || !imageUrl) {
      return c.json({ error: "Title and image URL are required" }, 400);
    }

    const existingProject = await kv.get(projectId);
    if (!existingProject) {
      return c.json({ error: "Project not found" }, 404);
    }

    const updatedProject = {
      ...existingProject,
      title,
      description: description || "",
      imageUrl,
      robloxLink: robloxLink || "",
      updatedAt: new Date().toISOString(),
    };

    await kv.set(projectId, updatedProject);
    
    return c.json({ success: true, project: updatedProject });
  } catch (error) {
    console.log(`Error updating project: ${error}`);
    return c.json({ error: "Failed to update project" }, 500);
  }
});

// Delete a project (requires auth)
app.delete("/make-server-51fd9f23/projects/:id", async (c) => {
  try {
    // Verify authentication
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: "Unauthorized - please log in to delete projects" }, 401);
    }

    const projectId = c.req.param('id');
    
    const existingProject = await kv.get(projectId);
    if (!existingProject) {
      return c.json({ error: "Project not found" }, 404);
    }

    await kv.del(projectId);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting project: ${error}`);
    return c.json({ error: "Failed to delete project" }, 500);
  }
});

Deno.serve(app.fetch);
