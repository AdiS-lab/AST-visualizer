import { command } from "../../../pkg/ast_visualizer.js";
import { useFileStore } from "../store/fileStore.js";
import { terminalManager } from "./terminal-manager.js";
import { animationManager } from "./animation-manager.js";

class CommandManager {
  runCommand(line: string) {
    const tokens = line.split(" ");
    const cmd = tokens[0];
    const arg = tokens.length > 1 ? tokens[1] : "";

    switch (cmd) {
      case "run":
        return this.runFile();
      case "animate":
        console.log(arg);
        if (arg === "donut.lox"){
          return animationManager.startDonut();
        } else {
          return animationManager.startCube();
        }
      case "stop":
        return animationManager.stop();
      case "clear":
        command("clear", "");
        return;
      default:
        terminalManager.writeError(`Unknown command: ${cmd}`);
    }
  }

  interrupt() {
    animationManager.interrupt();
  }

  private runFile() {
    const res = command("run", useFileStore.getState().content);
    const parsed = JSON.parse(res);
    if (parsed.error_message) {
      terminalManager.writeError(parsed.error_message);
    }
  }
}

export const commandManager = new CommandManager();
