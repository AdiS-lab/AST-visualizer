import init, { greet, command } from "../pkg/ast_visualizer.js";

const outputSpace = document.getElementById("output-space")
const submitButton = document.getElementById("submit-button") 
const commandInput = document.getElementById("command-input")
const fileContents = document.getElementById("file-contents")

window.write = (s) => {
    outputSpace.innerHTML = s;
}

init().then(() => {
    greet("WebAssembly");
});

submitButton.addEventListener("click", ()=>{
    command(commandInput.value, fileContents.value);
    commandInput.textContent = ""
})
