import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "motion/react";
import { LogOut, Plus } from "lucide-react";
import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { AdminPanel } from "./components/AdminPanel";
import { LoginModal } from "./components/LoginModal";
import { FirstTimeSetup } from "./components/FirstTimeSetup";
import { MouseTrail } from "./components/MouseTrail";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { AboutMe } from "./components/AboutMe";
import { Button } from "./components/ui/button";
import { projectId, publicAnonKey } from "./utils/supabase/info";
import { Toaster, toast } from "sonner@2.0.3";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  robloxLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Create Supabase client singleton outside component
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-51fd9f23`;

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        setAccessToken(session.access_token);
        setIsAdmin(true);
      }
    } catch (error) {
      console.log("Session check error:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${serverUrl}/projects`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (session?.access_token) {
        setAccessToken(session.access_token);
        setIsAdmin(true);
        setShowLoginModal(false);
        toast.success("Logged in successfully!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setAccessToken(null);
      setIsAdmin(false);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const response = await fetch(`${serverUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create account");
      }

      toast.success("Account created! You can now log in.");
      setShowSetupModal(false);
      setShowLoginModal(true);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create account");
    }
  };

  const handleSaveProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!accessToken) {
      toast.error("You must be logged in to save projects");
      return;
    }

    try {
      if (editingProject) {
        // Update existing project
        const response = await fetch(`${serverUrl}/projects/${editingProject.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(projectData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to update project");
        }

        toast.success("Project updated successfully!");
      } else {
        // Create new project
        const response = await fetch(`${serverUrl}/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(projectData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create project");
        }

        toast.success("Project added successfully!");
      }

      await fetchProjects();
      setShowAdminPanel(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!accessToken) {
      toast.error("You must be logged in to delete projects");
      return;
    }

    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`${serverUrl}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete project");
      }

      toast.success("Project deleted successfully!");
      await fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete project");
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowAdminPanel(true);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowAdminPanel(true);
  };

  // Secret login trigger - click logo 5 times
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount >= 5) {
      setShowLoginModal(true);
      setLogoClickCount(0);
    }

    // Reset counter after 3 seconds
    setTimeout(() => {
      setLogoClickCount(0);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" theme="dark" />
      <MouseTrail />
      <AnimatedBackground />

      {/* Secret login logo (top left corner) */}
      <motion.div
        className="fixed top-6 left-6 z-40 cursor-pointer select-none"
        onClick={handleLogoClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg border-2 border-primary/30">
          <span className="text-xl font-bold text-black">W</span>
        </div>
      </motion.div>

      {/* Admin controls */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-40 flex gap-3"
        >
          <Button
            variant="default"
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
            onClick={handleAddProject}
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-primary/50 hover:bg-primary/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </motion.div>
      )}

      {/* Main content */}
      <Hero featuredProjects={projects} />

      <AboutMe />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <ProjectsSection
          projects={projects}
          isAdmin={isAdmin}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      )}
      
      <ContactSection />

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignupClick={() => {
          setShowLoginModal(false);
          setShowSetupModal(true);
        }}
      />

      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => {
          setShowAdminPanel(false);
          setEditingProject(null);
        }}
        editingProject={editingProject}
        onSave={handleSaveProject}
      />

      <FirstTimeSetup
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        onSignup={handleSignup}
      />
    </div>
  );
}