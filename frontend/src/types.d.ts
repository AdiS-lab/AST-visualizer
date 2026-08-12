interface Window {
  write_to_screen: (s: string) => void;
  clear_screen: () => void;
  draw_node: (x: number, y: number, label: string) => void;
  draw_line: (x1: number, y1: number, x2: number, y2: number) => void;
  clear_canvas: () => void;
}