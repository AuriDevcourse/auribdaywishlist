import { cn } from "@/lib/utils";
import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

export const SoftYellowGlow = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className={cn("min-h-screen w-full relative bg-white overflow-hidden", className)}>
      {/* MeshGradient Background */}
      <div className="fixed inset-0 w-screen h-screen">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={["#FFF991", "#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFDFBA", "#E0BBE4"]}
              distortion={0.8}
              swirl={0.6}
              grainMixer={0}
              grainOverlay={0}
              speed={0.3}
              offsetX={0.08}
            />
            <div className="absolute inset-0 pointer-events-none bg-white/20" />
          </>
        )}
      </div>
      {/* Your Content/Components */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
