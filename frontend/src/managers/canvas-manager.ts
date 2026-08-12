const NODE_RADIUS = 6;
const FONT = "12px monospace";
const NODE_COLOR = "#e5e5e5";
const LABEL_COLOR = "#a0a0a0";

const PADDING_TOP = 40;

export class CanvasManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    // initialize glue code
    window.draw_node = (x, y, label) => this.drawNode(x, y, label);
    window.clear_canvas = () => this.clear();
  }

  attach(element: HTMLCanvasElement) {
    this.canvas = element;
    this.ctx = element.getContext("2d")!;
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

  clear() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export const canvasManager = new CanvasManager();