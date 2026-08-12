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
      canvasManager.attach(canvas);
    }

    console.log(canvasRef.current?.children);
    console.log(canvasRef.current)

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      canvas.width = width;
      canvas.height = height;
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#1a1a1e]">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
