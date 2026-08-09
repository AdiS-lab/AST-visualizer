 import init, { greet } from "../pkg/ast_visualizer.js";

init().then(() => {
    greet("WebAssembly");
});

const triggerDonut = getElementById("donut");
