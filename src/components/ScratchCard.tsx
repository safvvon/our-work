"use client";

import React, { useRef, useEffect, useState } from "react";

interface ScratchCardProps {
  children: React.ReactNode;
  brushSize?: number;
  coverColor?: string;
  finishPercent?: number;
  onComplete?: () => void;
  className?: string;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  children,
  brushSize = 40,
  coverColor = "#111111",
  finishPercent = 50,
  onComplete,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas resolution to match its displayed size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Fill the canvas with a realistic scratch-off foil effect
      if (!isFinished) {
        // 1. Base Cover Color (uses the prop passed from parent)
        ctx.fillStyle = coverColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 2. Generate Noise for metallic texture
        try {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < imgData.data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 40; // Random noise
            imgData.data[i] = Math.min(255, Math.max(0, imgData.data[i] + noise));
            imgData.data[i+1] = Math.min(255, Math.max(0, imgData.data[i+1] + noise));
            imgData.data[i+2] = Math.min(255, Math.max(0, imgData.data[i+2] + noise));
          }
          ctx.putImageData(imgData, 0, 0);
        } catch (e) {
          // Fallback if getImageData fails due to cross-origin or other issues
        }

        // 3. Add a subtle gradient overlay for shine and depth
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.15)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 4. Add text overlay
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.8;
        ctx.font = "900 24px 'Inter', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Text shadow/highlight for engraved look
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        
        ctx.fillText("SCRATCH TO REVEAL", canvas.width / 2, canvas.height / 2);
        
        // Reset shadow so it doesn't affect subsequent draws
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.globalAlpha = 1.0;
      }
    };

    resizeCanvas();

    // Listen for resize to adjust canvas
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [coverColor, isFinished, isDrawing]);

  // Calculate percentage of scratched area
  const getScratchedPercentage = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentPixels = 0;
    const totalPixels = pixels.length / 4;

    // Check alpha channel for transparency
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }
    return (transparentPixels / totalPixels) * 100;
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isFinished) return;
    const pos = getPointerPos(e);
    if (pos) {
      if (lastPoint) {
        scratchLine(lastPoint.x, lastPoint.y, pos.x, pos.y);
      } else {
        scratch(pos.x, pos.y);
      }
      setLastPoint(pos);
      checkCompletion();
    }
  };

  const handlePointerLeave = () => {
    if (isFinished) return;
    setLastPoint(null);
    setIsDrawing(false);
  };

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2, false);
    ctx.fill();
  };

  const scratchLine = (x1: number, y1: number, x2: number, y2: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const checkCompletion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const percentage = getScratchedPercentage(ctx, canvas);
    if (percentage > finishPercent) {
      setIsFinished(true);
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full h-full select-none ${className}`}>
      {children}
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-50 rounded-[inherit] transition-opacity duration-1000 cursor-crosshair"
        style={{ 
          opacity: isFinished ? 0 : 1, 
          pointerEvents: isFinished ? "none" : "auto",
          touchAction: "none"
        }}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerLeave}
        onTouchCancel={handlePointerLeave}
      />
    </div>
  );
};

export default ScratchCard;
