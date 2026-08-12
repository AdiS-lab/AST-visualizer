import { useEffect, useRef } from "react";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import init, { greet } from "../../../pkg/ast_visualizer.js";
import { commandManager } from "../managers/command-manager.js";
import { terminalManager } from "../managers/terminal-manager.js";
import "@xterm/xterm/css/xterm.css";

export function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<XTerm | null>(null);
  const lineRef = useRef("");

  function readCommand(term: XTerm) {
    term.onData((data) => {
      switch (data) {
        case "\r": {
          const line = lineRef.current.trim();
          term.write("\r\n");
          if (line) {
            commandManager.runCommand(line);
          }
          lineRef.current = "";
          term.write("$ ");
          return;
        }
        case "\x03": {
          commandManager.interrupt();
          lineRef.current = "";
          term.write("\r\n$ ");
          return;
        }
        case "\x7f": {
          if (lineRef.current.length > 0) {
            lineRef.current = lineRef.current.slice(0, -1);
            term.write("\b \b");
          }
          return;
        }
        default: {
          lineRef.current += data;
          term.write(data);
          return;
        }
      }
    });
  }

  useEffect(() => {
    if (!containerRef.current || termRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "monospace",
      theme: {
        background: "#1a1a1e",
        foreground: "#e5e5e5",
        cursor: "#e5e5e5",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    terminalManager.attach(term);

    init().then(() => {
      greet("WebAssembly");
    });

    term.open(containerRef.current);
    fitAddon.fit();

    term.writeln("\x1b[36mCommands:\x1b[0m");
    term.writeln("  \x1b[33mrun\x1b[0m                  Run the current file");
    term.writeln("  \x1b[33manimate donut.lox\x1b[0m    Load the donut animation");
    term.writeln("  \x1b[33mclear\x1b[0m                Clear the terminal");
    term.writeln("  \x1b[33mCtrl+C\x1b[0m               Stop current animation");
    term.writeln("");
    term.write("$ ");
    termRef.current = term;

    readCommand(term);

    const observer = new ResizeObserver(() => fitAddon.fit());
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      term.dispose();
      termRef.current = null;
    };
  }, []);

  return (
    <div className = "flex flex-col w-full h-full" >
      <div ref={containerRef} className="w-full h-full" />
    </div>

  );
}
