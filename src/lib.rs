use wasm_bindgen::prelude::*;
use std::fs;

mod helpers;
mod interpreter;
mod parser;
mod statements;
mod tokenizer;
mod types;

use interpreter::Interpreter;
use parser::{Parser, parse};
use statements::execute;
use tokenizer::tokenize;

#[wasm_bindgen]
extern "C" {
    fn write(S: String);

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
pub fn command(terminal_line: String, file_contents: String){
    log(&format!("{}", terminal_line));

  let args: Vec<&str> = terminal_line.split(" ").collect();
  
    let command = args[0];
    log(&format!("these are file contents {}", file_contents));

    match command {
        "tokenize" => {
            let (tokens, err) = tokenize(file_contents);
            for token in &tokens {
                println!("{}", token)
            }

            if !err.is_empty() {
                for err_message in err {
                    eprintln!("{}", err_message)
                }
                error("65");
            };

            error("65");
        }
        "parse" => {
            let (tokens, _) = tokenize(file_contents);
            if tokens.len() == 1 {
                error("65");
            }

            let mut parser: Parser = Parser {
                tokens,
                curr_pos: 0,
            };
            match parser.equality() {
                Ok(tree) => {
                    let ast_tree: String = parse(tree);
                    println!("{}", ast_tree);
                }
                Err(e) => {
                    eprintln!("{}", e);
                    error("65");
                }
            };
            log("0");
        }
        "evaluate" => {
            let (tokens, _) = tokenize(file_contents);
            let mut parser = Parser {
                tokens,
                curr_pos: 0,
            };
            match parser.equality() {
                Ok(tree) => {
                    let mut interpreter: Interpreter = Interpreter::new();
                    match interpreter.evaluate(tree) {
                        Ok(ast_tree) => println!("{}", ast_tree),
                        Err(e) => {
                            eprintln!("{}", e);
                            error("70");
                        }
                    };
                }
                Err(e) => {
                    eprintln!("{}", e);
                    error("65");
                }
            };
            error("0");
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
                        Err(e) => {
                            eprintln!("{}", e);
                            error("70");
                        }
                    }
                }

                Err(e) => {
                    eprintln!("{}", e);
                    error("65");
                }
            };
            log("0");
        }
        _ => {
            eprintln!("Unknown command: {}", command);
            error("1");
        }
    }
}
