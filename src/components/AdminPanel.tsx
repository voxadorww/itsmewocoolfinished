import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  robloxLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  editingProject: Project | null;
  onSave: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function AdminPanel({ isOpen, onClose, editingProject, onSave }: AdminPanelProps) {
  const [title, setTitle] = useState(editingProject?.title || "");
  const [description, setDescription] = useState(editingProject?.description || "");
  const [imageUrl, setImageUrl] = useState(editingProject?.imageUrl || "");
  const [robloxLink, setRobloxLink] = useState(editingProject?.robloxLink || "");

  // Update form when editingProject changes
  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setDescription(editingProject.description);
      setImageUrl(editingProject.imageUrl);
      setRobloxLink(editingProject.robloxLink || "");
    } else {
      setTitle("");
      setDescription("");
      setImageUrl("");
      setRobloxLink("");
    }
  }, [editingProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, imageUrl, robloxLink });
    
    // Reset form
    setTitle("");
    setDescription("");
    setImageUrl("");
    setRobloxLink("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-card border-l border-border z-50 overflow-y-auto"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold gradient-text">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-primary/10"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter project title"
                    required
                    className="mt-2 bg-input-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project..."
                    rows={4}
                    className="mt-2 bg-input-background border-border focus:border-primary resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="imageUrl">Image URL *</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="mt-2 bg-input-background border-border focus:border-primary"
                  />
                  {imageUrl && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-border">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="robloxLink">Roblox Link (Optional)</Label>
                  <Input
                    id="robloxLink"
                    type="url"
                    value={robloxLink}
                    onChange={(e) => setRobloxLink(e.target.value)}
                    placeholder="https://www.roblox.com/games/..."
                    className="mt-2 bg-input-background border-border focus:border-primary"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
                  >
                    {editingProject ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {editingProject ? "Save Changes" : "Add Project"}
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={onClose}
                    className="border-border hover:bg-secondary"
                  >
                    Cancel
                  </Button>
                </div>
              </form>

              {/* Help text */}
              <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-primary">Tip:</strong> Make sure your image URLs are publicly accessible. 
                  You can use image hosting services like Imgur or upload to Roblox and use the asset URL.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}