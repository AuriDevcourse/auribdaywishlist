"use client";
import { useEffect, useRef } from "react";

export const WarpBackground = ({
  children,
  className,
  containerClassName,
  colors,
  warpSpeed = "slow",
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  warpSpeed?: "slow" | "fast";
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colorPalette = colors || [
      "#4F46E5",
      "#7C3AED",
      "#EC4899",
      "#F59E0B",
      "#10B981",
    ];

    class Star {
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;
      color: string;

      constructor() {
        this.x = canvas ? Math.random() * canvas.width - canvas.width / 2 : 0;
        this.y = canvas ? Math.random() * canvas.height - canvas.height / 2 : 0;
        this.z = canvas ? Math.random() * canvas.width : 1;
        this.px = 0;
        this.py = 0;
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      }

      update(speed: number) {
        if (!canvas) return;
        this.z -= speed;
        if (this.z <= 0) {
          this.z = canvas.width;
          this.x = Math.random() * canvas.width - canvas.width / 2;
          this.y = Math.random() * canvas.height - canvas.height / 2;
          this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        }
      }

      draw() {
        if (!ctx || !canvas) return;

        const sx = (this.x / this.z) * canvas.width + canvas.width / 2;
        const sy = (this.y / this.z) * canvas.height + canvas.height / 2;
        const size = (1 - this.z / canvas.width) * 2;

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw trail
        ctx.beginPath();
        ctx.moveTo(this.px, this.py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = size;
        ctx.stroke();

        this.px = sx;
        this.py = sy;
      }
    }

    // Initialize stars
    for (let i = 0; i < 1000; i++) {
      stars.push(new Star());
    }

    const speed = warpSpeed === "fast" ? 20 : 5;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update(speed);
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, warpSpeed]);


  return (
    <div className={`relative ${containerClassName}`}>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-0 ${className}`}
        style={{
          background: "linear-gradient(to bottom, #000000, #0a0a0a)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
