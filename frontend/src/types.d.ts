interface Window {
  write_to_screen: (s: string) => void;
  clear_screen: () => void;
  draw_node: (x: number, y: number, label: string) => void;
  clear_canvas: () => void;
}