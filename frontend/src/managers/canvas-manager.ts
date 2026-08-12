const NODE_RADIUS = 4;
const FONT = "12px monospace";
const NODE_COLOR = "#e5e5e5";
const LABEL_COLOR = "#a0a0a0";
const LINE_COLOR = "#555555";

const PADDING_TOP = 40;

interface Node {
  x: number;
  y: number;
  label: string;
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

type DrawCall = { type: "node"; data: Node } | { type: "line"; data: Line };

export class CanvasManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private calls: DrawCall[] = [];

  attach(element: HTMLCanvasElement) {
    this.canvas = element;
    this.ctx = element.getContext("2d")!;

    window.draw_node = (x, y, label) => this.drawNode(x, y, label);
    window.draw_line = (x1, y1, x2, y2) => this.drawLine(x1, y1, x2, y2);
    window.clear_canvas = () => this.clear();
  }

  get element() {
    return this.canvas;
  }

  get startX() {
    return this.canvas ? this.canvas.width / 2 : 0;
  }

  get startY() {
    return PADDING_TOP;
  }

  drawNode(x: number, y: number, label: string) {
    this.calls.push({ type: "node", data: { x, y, label } });
    this.renderNode(x, y, label);
    this.fitCanvas();
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.calls.push({ type: "line", data: { x1, y1, x2, y2 } });
    this.renderLine(x1, y1, x2, y2);
  }

  clear() {
    this.calls = [];
    this.clearCanvas();
  }

  redraw() {
    this.clearCanvas();
    for (const call of this.calls) {
      if (call.type === "line") {
        this.renderLine(call.data.x1, call.data.y1, call.data.x2, call.data.y2);
      } else {
        this.renderNode(call.data.x, call.data.y, call.data.label);
      }
    }
  }

  private fitCanvas() {
    if (!this.canvas) return;
    const padding = 40;
    let maxX = 0;
    let maxY = 0;

    for (const call of this.calls) {
      if (call.type === "node") {
        maxX = Math.max(maxX, call.data.x + padding);
        maxY = Math.max(maxY, call.data.y + padding);
      }
    }

    let resized = false;
    if (maxX > this.canvas.width) {
      this.canvas.width = maxX;
      resized = true;
    }
    if (maxY > this.canvas.height) {
      this.canvas.height = maxY;
      resized = true;
    }
    if (resized) {
      this.redraw();
    }
  }

  private renderLine(x1: number, y1: number, x2: number, y2: number) {
    if (!this.ctx) return;
    this.ctx.strokeStyle = LINE_COLOR;
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  private renderNode(x: number, y: number, label: string) {
    if (!this.ctx) return;
    this.ctx.fillStyle = NODE_COLOR;
    this.ctx.beginPath();
    this.ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = LABEL_COLOR;
    this.ctx.font = FONT;
    this.ctx.textAlign = "center";
    this.ctx.fillText(label, x, y - NODE_RADIUS - 4);
  }

  private clearCanvas() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export const canvasManager = new CanvasManager();