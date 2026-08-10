import init, { greet, command } from "../pkg/ast_visualizer.js";

const outputSpace = document.getElementById("output-space")
const submitButton = document.getElementById("submit-button") 
const commandInput = document.getElementById("command-input")
const fileContents = document.getElementById("file-contents")

const saved = localStorage.getItem("file-contents");
if (saved) fileContents.value = saved;
fileContents.addEventListener("input", () => {
    localStorage.setItem("file-contents", fileContents.value);
});

window.clear_all = () => { outputSpace.innerHTML = "" }
window.write_to_screen = (s) => {
    outputSpace.innerHTML += s;
}

init().then(() => {
    greet("WebAssembly");
});

function runDonut(timestamp){
    const res = command(run, fileContents.value)
    const data = JSON.parse(res);

    if (data.error_message) {
        console.error(data)
        outputSpace.innerHTML = data.error_message
    }
    requestAnimationFrame(runDonut)
}

submitButton.addEventListener("click", ()=>{
    const command = commandInput?.value.split(" ")[0];

    switch (command){
        case "animation": { requestAnimation(frame) }
        default: { 
            const res = command(commandInput.value, fileContents.value);
            const data = JSON.parse(res);

            if (data.error_message) {
                console.error(data)
                outputSpace.innerHTML = data.error_message
            }
        }
    }
    commandInput.textContent = ""
})

const dragBar = document.getElementById("drag-bar");
const editor = document.getElementById("editor");
const terminal = document.getElementById("terminal");
let dragging = false;

dragBar.addEventListener("mousedown", () => { dragging = true; });
document.addEventListener("mouseup", () => { dragging = false; });
document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const totalWidth = document.body.clientWidth;
    editor.style.flex = "none";
    terminal.style.flex = "none";
    editor.style.width = e.clientX + "px";
    terminal.style.width = (totalWidth - e.clientX - 5) + "px";
});