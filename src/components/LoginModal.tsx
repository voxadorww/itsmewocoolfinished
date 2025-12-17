import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, LogIn, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignupClick?: () => void;
}

export function LoginModal({ isOpen, onClose, onLogin, onSignupClick }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
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
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold gradient-text">Admin Login</h2>
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="mt-2 bg-input-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="mt-2 bg-input-background border-border focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary mt-6"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Button>

                {onSignupClick && (
                  <Button
                    variant="link"
                    size="sm"
                    className="w-full text-center mt-2"
                    onClick={onSignupClick}
                  >
                    Sign Up
                  </Button>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}