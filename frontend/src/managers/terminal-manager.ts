import { Terminal } from "@xterm/xterm";

export class TerminalManager {
  private term: Terminal | null = null;

  constructor() {
    // initialize glue code
    window.write_to_screen = (s) => this.write(s);
    window.clear_screen = () => this.clearScreen();
  }

  attach(term: Terminal) {
    this.term = term;
  }

  get instance() {
    return this.term;
  }

  write(s: string) {
    if (!this.term) return;
    this.term.write(s.replace(/\n/g, "\r\n"));
  }

  writeln(s: string) {
    if (!this.term) return;
    this.term.writeln(s);
  }

  writeError(msg: string) {
    if (!this.term) return;
    this.term.writeln(`\x1b[31m${msg}\x1b[0m`);
  }

  clearScreen() {
    if (!this.term) return;
    this.term.write("\x1b[2J\x1b[H");
  }
}

export const terminalManager = new TerminalManager();
