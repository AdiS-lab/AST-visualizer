import { command } from "../../../pkg/ast_visualizer.js";
import { useFileStore } from "../store/fileStore.js";
import { terminalManager } from "./terminal-manager.js";

export class AnimationManager {
  private frameId: number | null = null;
  private A = 0;
  private B = 0;

  get running() {
    return this.frameId !== null;
  }

  startDonut() {
    if (this.frameId !== null){
      terminalManager.writeln(
        "Animation already running. Type 'stop' to cancel.",
      );
      return;
    }
    this.A = 0;
    this.B = 0;

    const loop = () => {
      this.A += 0.07;
      this.B += 0.03;
      terminalManager.clearScreen();

      const source = `var A=${this.A}; var B=${this.B}; ${useFileStore.getState().content}`;
      const res = command("run", source);
      const parsed = JSON.parse(res);

      if (parsed.error_message) {
        terminalManager.writeError(parsed.error_message);
        this.stop();
        return;
      }

      this.frameId = requestAnimationFrame(loop);
    };

    this.frameId = requestAnimationFrame(loop);
    terminalManager.writeln("Animation started. Type 'stop' to cancel.");
  }

  startCube() {}

  stop() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
      terminalManager.writeln("Animation stopped.");
    }
  }

  interrupt() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
      terminalManager.clearScreen();
    }
    terminalManager.writeln("^C");
  }
}

export const animationManager = new AnimationManager();
