import { useEffect, useRef, useState } from "react";

interface CanvasBackgroundProps {
  theme: "light" | "dark";
  matrixMode: boolean;
}

export default function CanvasBackground({ theme, matrixMode }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    window.addEventListener("mousemove", handleMouseMove as any);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Neural Net particle parameters
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: theme === "dark" ? "rgba(0, 242, 254, 0.4)" : "rgba(14, 116, 144, 0.4)",
      });
    }

    // Matrix Rain config
    const columns = Math.floor(width / 20);
    const rainDrops: number[] = Array.from({ length: columns }).map(() => Math.random() * -100);
    const characters = "0101100101010110101001010101MEME_BRAIN_AI_AUTOMATION_PYTHON_DJANGO";

    // Ambient render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. MATRIX RAIN MODE
      if (matrixMode) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#00ff66";
        ctx.font = "14px monospace";

        for (let i = 0; i < rainDrops.length; i++) {
          const char = characters[Math.floor(Math.random() * characters.length)];
          const x = i * 20;
          const y = rainDrops[i] * 20;

          // Fade out top stream
          if (Math.random() > 0.98) {
            ctx.fillStyle = "#ffffff"; // head raindrop
          } else {
            ctx.fillStyle = "rgba(0, 255, 102, 0.6)";
          }

          ctx.fillText(char, x, y);

          if (y > height && Math.random() > 0.975) {
            rainDrops[i] = 0;
          }
          rainDrops[i]++;
        }
      } else {
        // 2. STANDARD SCI-FI NEURAL CORE MODE
        const isDark = theme === "dark";

        // Soft background glow
        if (isDark) {
          ctx.fillStyle = "rgba(5, 5, 5, 1)";
          ctx.fillRect(0, 0, width, height);
        } else {
          ctx.fillStyle = "rgba(245, 247, 250, 1)";
          ctx.fillRect(0, 0, width, height);
        }

        // Render particles connections
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Bounce
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Attraction to cursor
          const dxMouse = p.x - mouseRef.current.x;
          const dyMouse = p.y - mouseRef.current.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - distMouse) / mouseRef.current.radius;
            p.x -= dxMouse * force * 0.02;
            p.y -= dyMouse * force * 0.02;
          }

          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "rgba(0, 242, 254, 0.75)" : "rgba(6, 182, 212, 0.75)";
          ctx.shadowBlur = distMouse < mouseRef.current.radius ? 8 : 0;
          ctx.shadowColor = isDark ? "#00f2fe" : "#06b6d4";
          ctx.fill();
          ctx.shadowBlur = 0;

          // Draw links to neighbors
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              const alpha = (130 - dist) / 130;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = isDark
                ? `rgba(0, 242, 254, ${alpha * 0.15})`
                : `rgba(6, 182, 212, ${alpha * 0.15})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        // Draw cursor pointer glow halo
        if (mouseRef.current.x !== -1000) {
          const grad = ctx.createRadialGradient(
            mouseRef.current.x,
            mouseRef.current.y,
            0,
            mouseRef.current.x,
            mouseRef.current.y,
            mouseRef.current.radius
          );
          if (isDark) {
            grad.addColorStop(0, "rgba(0, 242, 254, 0.08)");
            grad.addColorStop(1, "rgba(0, 242, 254, 0)");
          } else {
            grad.addColorStop(0, "rgba(6, 182, 212, 0.05)");
            grad.addColorStop(1, "rgba(6, 182, 212, 0)");
          }
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(
            mouseRef.current.x,
            mouseRef.current.y,
            mouseRef.current.radius,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, matrixMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${
        matrixMode ? "brightness-75" : ""
      }`}
    />
  );
}
