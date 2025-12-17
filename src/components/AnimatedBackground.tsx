import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.3, 0.9, 1],
          opacity: [0.2, 0.4, 0.25, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-20 right-20 w-[500px] h-[500px] bg-accent/25 rounded-full blur-3xl"
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.2, 1.1, 1],
          opacity: [0.25, 0.45, 0.2, 0.25],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-primary/18 rounded-full blur-3xl"
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -150, 75, 0],
          scale: [1, 1.4, 0.8, 1],
          opacity: [0.18, 0.35, 0.22, 0.18],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/3 w-[550px] h-[550px] bg-accent/22 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 150, 0],
          y: [0, 150, -100, 0],
          scale: [1, 0.9, 1.3, 1],
          opacity: [0.22, 0.4, 0.25, 0.22],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
      />

      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-12">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              animate={{
                strokeWidth: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </pattern>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b00" />
            <stop offset="100%" stopColor="#ff8c00" />
          </linearGradient>
        </defs>
        <motion.rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          animate={{
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-primary to-accent"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: "0 0 10px rgba(255, 107, 0, 0.4)",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Rotating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-primary/20"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-40 h-40 border-2 border-accent/25 rounded-full"
        animate={{
          rotate: -360,
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-36 h-36 border-2 border-primary/18"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
          opacity: [0.18, 0.35, 0.18],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-28 h-28 border-2 border-accent/22"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
        animate={{
          rotate: -360,
          scale: [1, 1.15, 1],
          opacity: [0.22, 0.42, 0.22],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Pulsing rings */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute top-1/2 left-1/2 rounded-full border border-primary/15"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            marginLeft: -(50 + i * 25),
            marginTop: -(50 + i * 25),
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Diagonal animated lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-[1.5px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{
            top: `${i * 12.5}%`,
            transform: "rotate(-45deg)",
            transformOrigin: "center",
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-4 h-4 rounded-full bg-primary/70"
        style={{
          boxShadow: "0 0 25px 8px rgba(255, 107, 0, 0.4)",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-5 h-5 rounded-full bg-accent/60"
        style={{
          boxShadow: "0 0 30px 10px rgba(255, 140, 0, 0.35)",
        }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Hexagon pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ff6b00' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.08, 0.2, 0.08],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Radial gradient overlay */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Scanning lines effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 0, 0.02) 2px, rgba(255, 107, 0, 0.02) 4px)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}