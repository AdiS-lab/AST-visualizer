use crate::Interpreter;
use crate::types::*;
use crate::{write_to_screen, log};

use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

pub fn execute(list: Vec<Declr>, interpreter: &mut Interpreter) -> Result<Lit, ErrorHandler> {
    for declaration in list{
        if let  Declr::VarDeclr(var_id, value) = declaration {
                add_var_to_scope(var_id, value, interpreter)?;
        }else if let Declr::FunDeclr(func_id, parameters, body) = declaration {
                add_func_to_scope(func_id, parameters, body, interpreter);
        } else if let Declr::Reg(stmt) = declaration {
                let val: Lit = execute_stmt(stmt, interpreter)?; // either for stmt, while stmt, return stmt, print stmt, func invocation, or just expression
                if matches!(val, Lit::Return(_)) {
                    return Ok(val);
                }
        }
    }
    return  Ok(Lit::Nil)
}

pub fn execute_stmt(stmt: Stmt, interpreter: &mut Interpreter) -> Result<Lit, ErrorHandler> {
    match stmt{
        Stmt::Print(expr) => {
            let val: Lit = interpreter.evaluate(expr)?;
            log("[PRINT STATEMENT BELOW]");
            write_to_screen(format!("{}\n", val));
            return Ok(Lit::Nil)
        },

        Stmt::Block(block_body)  => {
            interpreter.scope.push(new_scope());
            match execute(block_body, interpreter) {
                Ok(body_result) => {
                    if matches!(body_result, Lit::Return(_)){
                        return Ok(body_result);
                    }
                }
                Err(e) => return Err(e)
            }
            interpreter.scope.pop();
            return Ok(Lit::Nil)
        }, 

        Stmt::Expression(expr) => {
            interpreter.evaluate(expr)?;
            return Ok(Lit::Nil)
        },

        Stmt::ReturnStmt(expr) => {
            let return_val: Lit = interpreter.evaluate(expr)?;
            return Ok(Lit::Return(Box::new(return_val)));
        },

        Stmt::IfChain(conditional, then_stmt, else_stmt) =>  {
            let conditional_result: Lit = interpreter.evaluate(conditional)?;
            let valid_condition: bool = interpreter.is_truthy(conditional_result.clone());

            if valid_condition {
                let body_result: Lit = execute_stmt(*then_stmt, interpreter)?;
                if matches!(body_result, Lit::Return(_)) {
                    return Ok(body_result);
                }

            } else {
                let body_result: Lit = execute_stmt(*else_stmt, interpreter)?;
                if matches!(body_result, Lit::Return(_)) {
                    return Ok(body_result);
                }
            }
            return Ok(Lit::Nil)
        },

        Stmt::WhileStmt(conditional, stmt) => {
            let mut res: Lit = interpreter.evaluate(conditional.clone())?;

            while interpreter.is_truthy(res) {
                let body_result: Lit = execute_stmt(*stmt.clone(), interpreter)?;
                if matches!(body_result, Lit::Return(_)) {
                    return Ok(body_result);
                }
                res = interpreter.evaluate(conditional.clone())?;
            }
            return Ok(Lit::Nil)
        },

        Stmt::ForStmt(start_index, range, incr, body) => {
            execute(vec![*start_index], interpreter)?;

            let mut conditional =  Expr::Literal(Lit::Bool(true)); // ex) i < 5 or ;
            if let Stmt::Expression(c) = *range {
                conditional = c;
            }

            let mut loop_condition: Lit = interpreter.evaluate(conditional.clone())?;

            while interpreter.is_truthy(loop_condition) {
                let body_result: Lit = execute_stmt(*body.clone(), interpreter)?;
                if matches!(body_result, Lit::Return(_)) {
                    return Ok(body_result);
                }

                match incr {
                    Expr::Literal(Lit::Nil) => {}
                    _ => {
                        interpreter.evaluate(incr.clone())?;
                    }
                }

                loop_condition = interpreter.evaluate(conditional.clone())?;
            }
            return Ok(Lit::Nil) 
        }
    }
}

pub fn add_var_to_scope(
    id: String,
    stmt: Stmt,
    interpreter: &mut Interpreter,
) -> Result<(), ErrorHandler> {
    if let Stmt::Expression(expr) = stmt {
        let val: Lit = interpreter.evaluate(expr)?;
        interpreter.insert_into_scope(id, val);
    }
    return Ok(());
}

pub fn add_func_to_scope(
    id: String,
    parameters: Vec<String>,
    stmt: Stmt,
    interpreter: &mut Interpreter,
) {
    let temp_scope: Vec<Env> = interpreter.scope.clone();
    let val: Lit = Lit::DefineFn(id.clone(), parameters, Box::new(stmt), temp_scope);
    interpreter.insert_into_scope(id, val);
}

pub fn new_scope() -> Env {
    return Rc::new(RefCell::new(HashMap::new()));
}
