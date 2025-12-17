import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function MouseTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  useEffect(() => {
    let idCounter = 0;
    let animationFrameId: number;
    let lastX = 0;
    let lastY = 0;

    const updateTrail = () => {
      setTrail((prev) => {
        const newTrail = [
          ...prev,
          {
            x: lastX,
            y: lastY,
            id: idCounter++,
          },
        ];

        // Keep only the last 12 points for a smooth trail
        return newTrail.slice(-12);
      });

      animationFrameId = requestAnimationFrame(updateTrail);
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((point, index) => {
          const size = 3 + index * 0.3;
          const opacity = 0.3 + (index / trail.length) * 0.5;
          
          return (
            <motion.div
              key={point.id}
              initial={{ opacity: opacity, scale: 1 }}
              animate={{ opacity: 0, scale: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute rounded-full bg-gradient-to-r from-primary to-accent"
              style={{
                left: point.x,
                top: point.y,
                width: size,
                height: size,
                transform: "translate(-50%, -50%)",
                boxShadow: `
                  0 0 10px 2px rgba(255, 136, 0, 0.6),
                  0 0 20px 4px rgba(255, 136, 0, 0.4),
                  0 0 30px 6px rgba(255, 136, 0, 0.2)
                `,
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}