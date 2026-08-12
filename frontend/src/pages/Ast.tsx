import { useState } from "react";
import { AstCanvas } from "../components/AstCanvas";
import { FileView } from "../components/FileView";
import { Terminal } from "../components/Terminal";
import { Panel, Tab, ExternalLink } from "../ui";

type RightTab = "ast" | "file";

function WriteUp(){
  return (
  <>
    <p>
      Everything inside file contents represents my own interpreted programming language. Tokenizing a file, 
      is exactly how you think it would work. walk through every character and use conditionals to parse 
      words / symbols into an array of tokens. an AST (abstract syntax tree), is built by taking a linear 
      stream of tokens and performing an algorithm which ORDERS each token into a hierarchal like structure. 
    </p>
    <br></br>
    <p>
      
      take the expression 1 + 2.
      it is represented by the tokens: [1][+][2]
      these tokens are then fed into a parser.
      A parser is a vertical list of functions, ordered by grammar precedence.
      <br /><br />
      here is a simplified idea.
      more IMPORTANT or HIGHER LEVEL comes first ( think variable declarations, or function declarations )
      everything below (numbers, strings, unary operators - ! true), represent singular functionality ( LOWER LEVEL )
      higher level functions call the level below, until the bottom returns UP. We can catch the UPWARD motion,
      by peeking at the NEXT TOKEN, and go back down. This is how we create a tree ORDERED in the correct way.
      back to our example:
      <br /><br />
      We assume the first token is not an operator (not =, + - etc)
      Meaning we hit an addition function. an addition function calls the
      function below. we peek at the token... 1, keep going. we eventually
      reach the bottom of the functions. here we match on TYPE.
      <br /><br />
      our TYPE is a f64. so we return up our TYPE wrapped in an enum. as it is going
      up we hit our addition function AGAIN. THIS TIME, our peek says +. SO... we take our left side (1),
      store it, take our operator (+), store it. and call back down. It's a beautiful process.
      <br /><br />
      By the end of it we can write a Lisp formatted version like this:
      <br />
      Expr::Binary(+ Expr::Literal(Lit::F64(1)  Expr::Literal(Lit::F64(2))) )
      or simplified: (+ 1 2).
      at this point we have created an AST. we can either walk it and interpret functionality (what I did),
      or turn it into bytecode and stream into a virtual machine -- a software REPRESENTATION of a CPU -- which 
      will eat bytecode and compiles it to machine native code. amazing!!
      <br /><br />
      I did not conjure this idea up on my own -   
      <ExternalLink href="https://craftinginterpreters.com/">crafting interpreters. </ExternalLink>
      The top left component is a <ExternalLink href="https://xtermjs.org/">plugin terminal </ExternalLink>
      to the browser. Kind of like a terminal emulator. You can type code into the makeshift editor. and run commands
      as you would compile a real language on your own machine. Try out animate donut.lox to see something cool, inspiration from
      <ExternalLink href="https://www.a1k0n.net/2011/07/20/donut-math.html"> here </ExternalLink>. 
    </p>
    </>
  )
}

export function Ast() {
  const [tab, setTab] = useState<RightTab>("file");

  return (
    <div className="min-h-screen bg-white pt-16">
      <main className="flex h-[calc(100vh-4rem)]">

        <Panel className="flex flex-col">
          <div className="h-3/5 min-h-0 overflow-hidden">
            <Terminal />
          </div>
          <div className="flex flex-1 pt-4 overflow-hidden text-center justify-center items-center" style={{ fontFamily: "'Source Serif 4', serif" }}>
            WRITING BELOW
          </div>

        </Panel>

        <Panel className="flex flex-col border-l border-gray-200 p-0">
          <div className="flex gap-1 p-2 border-b border-gray-200">
            <Tab
              className="hover pointer"
              active={tab === "file"}
              onClick={() => setTab("file")}
            >
              File
            </Tab>

            <Tab
              className="pointer"
              active={tab === "ast"}
              variant="dark"
              onClick={() => setTab("ast")}
            >
              AST
            </Tab>
          </div>

          <div className={`flex-1 min-h-0 ${tab === "ast" ? "" : "hidden"}`}>
            <AstCanvas />
          </div>
          <div className={`flex-1 min-h-0 ${tab === "file" ? "" : "hidden"}`}>
            <FileView />
          </div>
        </Panel>
      </main>

      <div className = "p-30">
        <WriteUp />
      </div>

    </div>
  );
}