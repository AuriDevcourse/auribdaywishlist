import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface ScratchToRevealProps {
  children: React.ReactNode;
  width: number;
  height: number;
  minScratchPercentage?: number;
  className?: string;
  onComplete?: () => void;
  gradientColors?: [string, string, string];
}

const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  width,
  height,
  minScratchPercentage = 50,
  onComplete,
  children,
  className,
  gradientColors = ["#A97CF8", "#F38CB8", "#FDCC92"],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.fillStyle = "#ccc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      gradient.addColorStop(0, gradientColors[0]);
      gradient.addColorStop(0.5, gradientColors[1]);
      gradient.addColorStop(1, gradientColors[2]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text to canvas
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-12 * Math.PI / 180);
      
      // Calculate font size based on canvas width
      const fontSize = Math.min(canvas.width / 12, 36);
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.fillStyle = 'rgba(50, 50, 50, 0.8)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Split text into two lines for better fit
      ctx.fillText('Scratch off', 0, -fontSize / 2);
      ctx.fillText('to see the item', 0, fontSize / 2);
      ctx.restore();
    }
  }, [gradientColors]);

  useEffect(() => {
    const handleDocumentMouseMove = (event: MouseEvent) => {
      if (!isScratching) return;
      scratch(event.clientX, event.clientY);
    };

    const handleDocumentTouchMove = (event: TouchEvent) => {
      if (!isScratching) return;
      const touch = event.touches[0];
      scratch(touch.clientX, touch.clientY);
    };

    const handleDocumentMouseUp = () => {
      setIsScratching(false);
      checkCompletion();
    };

    const handleDocumentTouchEnd = () => {
      setIsScratching(false);
      checkCompletion();
    };

    document.addEventListener("mousedown", handleDocumentMouseMove);
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("touchstart", handleDocumentTouchMove);
    document.addEventListener("touchmove", handleDocumentTouchMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("touchend", handleDocumentTouchEnd);
    document.addEventListener("touchcancel", handleDocumentTouchEnd);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseMove);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("touchstart", handleDocumentTouchMove);
      document.removeEventListener("touchmove", handleDocumentTouchMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("touchend", handleDocumentTouchEnd);
      document.removeEventListener("touchcancel", handleDocumentTouchEnd);
    };
  }, [isScratching]);

  const handleMouseDown = () => setIsScratching(true);

  const handleTouchStart = () => setIsScratching(true);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left + 16;
      const y = clientY - rect.top + 16;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 50, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const startAnimation = async () => {
    await controls.start({
      scale: [1, 1.5, 1],
      rotate: [0, 10, -10, 10, -10, 0],
      transition: { duration: 0.5 },
    });

    // Call onComplete after animation finishes
    if (onComplete) {
      onComplete();
    }
  };

  const checkCompletion = () => {
    if (isComplete) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const totalPixels = pixels.length / 4;
      let clearPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearPixels++;
      }

      const percentage = (clearPixels / totalPixels) * 100;

      if (percentage >= minScratchPercentage) {
        setIsComplete(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startAnimation();
      }
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width, height });

  useEffect(() => {
    if (width === 0 && containerRef.current) {
      const newWidth = containerRef.current.offsetWidth;
      setDimensions({
        width: newWidth,
        height: height
      });
    }
  }, [width, height]);

  // Redraw canvas when dimensions change
  useEffect(() => {
    if (dimensions.width > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        ctx.fillStyle = "#ccc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height,
        );
        gradient.addColorStop(0, gradientColors[0]);
        gradient.addColorStop(0.5, gradientColors[1]);
        gradient.addColorStop(1, gradientColors[2]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text to canvas
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-12 * Math.PI / 180);
        
        // Calculate font size based on canvas width
        const fontSize = Math.min(canvas.width / 12, 36);
        ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        ctx.fillStyle = 'rgba(50, 50, 50, 0.8)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Split text into two lines for better fit
        ctx.fillText('Scratch off', 0, -fontSize / 2);
        ctx.fillText('to see the item', 0, fontSize / 2);
        ctx.restore();
      }
    }
  }, [dimensions, gradientColors]);

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative select-none", className)}
      style={{
        width: width === 0 ? '100%' : width,
        height,
        cursor: isComplete
          ? "default"
          : "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj4KICA8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyOCIgc3R5bGU9ImZpbGw6cmdiYSgyNTUsMjU1LDI1NSwwLjUpO3N0cm9rZTojMDAwO3N0cm9rZS13aWR0aDoxcHg7IiAvPgo8L3N2Zz4='), auto",
      }}
      animate={controls}
    >
      <div className="absolute inset-0 z-0">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute left-0 top-0 z-10 w-full"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      ></canvas>
    </motion.div>
  );
};

export { ScratchToReveal };
