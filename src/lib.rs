use wasm_bindgen::prelude::*;
use serde_json::json;

mod helpers;
mod interpreter;
mod parser;
mod statements;
mod tokenizer;
mod types;

use interpreter::Interpreter;
use parser::{Parser};
use statements::execute;
use tokenizer::tokenize;

#[wasm_bindgen]
extern "C" {
    fn write_to_screen(S: String);
    fn clear_screen();
    fn draw_node(x: i32, y: i32, label: &str);
    fn clear_canvas();

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    
    #[wasm_bindgen(js_namespace = console)]
    fn error(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    log(&format!("Hello, {}!", name));
}

#[wasm_bindgen] 
pub fn command(terminal_line: String, file_contents: String) -> String{
    let args: Vec<&str> = terminal_line.split(" ").collect();
    let command = args[0];
    // log(&format!("this is command inside rust {}", command));
    
    match command {
        "clear" =>{
            clear_screen();
            return json!({"message": "cleared"}).to_string()
        }
        "run" => {
            let (tokens, _) = tokenize(file_contents);
            let mut parser = Parser {
                tokens,
                curr_pos: 0,
            };
            match parser.declaration() {
                Ok(tree) => {
                    let mut interpreter: Interpreter = Interpreter::new();
                    match execute(tree, &mut interpreter) {
                        Ok(_) => {}
                        Err(e) => return json!({"error_message": format!("{}", e), "exit_code": 70}).to_string()
                    }
                }
                Err(e) => return json!({"error_message": format!("{}", e), "exit_code": 65}).to_string()
            };
            return json!({"message": "success!".to_string(), "exit_code": 0}).to_string();
        }
        _ => {
            return json!({"error_message": format!("[ERROR]: Unknown command: {}", command), "exit_code": 1}).to_string()
        }
    }
}
