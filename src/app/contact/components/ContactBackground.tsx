"use client";

import React, { useEffect, useRef } from "react";

export const ContactBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    // Ribbon nodes for the flowing neon energy ribbons
    const ribbons: Array<{
      points: Array<{ x: number; y: number }>;
      color: string;
      speed: number;
      amplitude: number;
      frequency: number;
      offset: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Initialize 3 glowing energy ribbons flowing horizontally/vertically
    ribbons.push({
      points: [],
      color: "rgba(57, 255, 20, 0.08)", // neon green
      speed: 0.002,
      amplitude: 50,
      frequency: 0.003,
      offset: 0,
    });
    ribbons.push({
      points: [],
      color: "rgba(0, 255, 153, 0.06)", // mint/emerald
      speed: 0.0015,
      amplitude: 70,
      frequency: 0.002,
      offset: Math.PI / 2,
    });
    ribbons.push({
      points: [],
      color: "rgba(102, 255, 204, 0.05)", // cyan accent
      speed: 0.001,
      amplitude: 90,
      frequency: 0.001,
      offset: Math.PI,
    });

    let gridOffset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Cyber Grid Pattern (moving downward/skewed)
      ctx.save();
      ctx.strokeStyle = "rgba(57, 255, 20, 0.015)";
      ctx.lineWidth = 1;
      
      gridOffset += 0.4;
      if (gridOffset >= 40) gridOffset = 0;

      const gridSize = 40;
      
      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal moving grid lines
      for (let y = gridOffset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Draw Flowing Neon Energy Ribbons
      ribbons.forEach((ribbon) => {
        ribbon.offset += ribbon.speed;
        ctx.beginPath();
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = 3;
        
        // Apply blur shadow to ribbons for glowing effect
        ctx.shadowColor = ribbon.color.replace(/0\.\d+\)/, "0.5)");
        ctx.shadowBlur = 15;

        for (let x = 0; x <= canvas.width; x += 10) {
          const y =
            canvas.height * 0.5 +
            Math.sin(x * ribbon.frequency + ribbon.offset) * ribbon.amplitude +
            Math.cos(x * 0.0005 + ribbon.offset * 0.5) * 30;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      });

      // 3. Draw & Update Floating Particles
      ctx.fillStyle = "#39FF14";
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around borders
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.speedX = -p.speedX;
        }

        ctx.save();
        ctx.shadowColor = "#39FF14";
        ctx.shadowBlur = 8;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4. Ambient light glows (corners)
      const gradTL = ctx.createRadialGradient(0, 0, 0, 0, 0, 400);
      gradTL.addColorStop(0, "rgba(57, 255, 20, 0.04)");
      gradTL.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradTL;
      ctx.fillRect(0, 0, 400, 400);

      const gradBR = ctx.createRadialGradient(canvas.width, canvas.height, 0, canvas.width, canvas.height, 600);
      gradBR.addColorStop(0, "rgba(0, 255, 153, 0.05)");
      gradBR.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradBR;
      ctx.fillRect(canvas.width - 600, canvas.height - 600, 600, 600);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: "block" }}
    />
  );
};

export default ContactBackground;
