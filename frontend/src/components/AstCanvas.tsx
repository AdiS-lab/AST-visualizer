import { useEffect, useRef } from "react";
import { canvasManager } from "../managers/canvas-manager";

export function AstCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    if (canvasManager.element !== canvas) {
      console.log("attached canvas");
      canvasManager.attach(canvas);
    }
    
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        canvas.width = width;
        canvas.height = height;
        canvasManager.redraw();
      }
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#1a1a1e] overflow-auto">
      <canvas ref={canvasRef} width={800} height={600} className="block min-w-full min-h-full" />
    </div>
  );
}
