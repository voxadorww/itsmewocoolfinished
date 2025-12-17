import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface FirstTimeSetupProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (email: string, password: string) => void;
}

export function FirstTimeSetup({ isOpen, onClose, onSignup }: FirstTimeSetupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    onSignup(email, password);
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-md pointer-events-auto shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold gradient-text">First Time Setup</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-primary/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-muted-foreground mb-6">
                Create your admin account to manage your portfolio projects.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="mt-2 bg-input-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="mt-2 bg-input-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="mt-2 bg-input-background border-border focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary mt-6"
                >
                  <Shield className="w-5 h-5" />
                  Create Admin Account
                </Button>
              </form>

              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-primary">Note:</strong> Keep your credentials safe. You'll use these to log in and manage your projects.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
