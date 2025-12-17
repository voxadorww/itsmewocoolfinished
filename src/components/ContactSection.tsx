import { motion } from "motion/react";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export function ContactSection() {
  const handleEmailClick = () => {
    window.location.href = "mailto:richeltom1810@gmail.com";
  };

  const copyDiscord = () => {
    navigator.clipboard.writeText("itsme_wocool");
    alert("Discord username copied to clipboard!");
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Get in touch and let's create something amazing!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Email button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="default"
              className="gap-3 px-8 py-6 text-lg bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300"
              onClick={handleEmailClick}
            >
              <Mail className="w-5 h-5" />
              Send Email
            </Button>
          </motion.div>

          {/* Discord button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="gap-3 px-8 py-6 text-lg border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              onClick={copyDiscord}
            >
              <MessageCircle className="w-5 h-5" />
              Discord: itsme_wocool
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground">
            © 2025 ItsMe_WoCool. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
