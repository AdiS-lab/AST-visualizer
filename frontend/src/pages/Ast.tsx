import { useState } from "react";
import { AstCanvas } from "../components/AstCanvas";
import { FileView } from "../components/FileView";
import { Terminal } from "../components/Terminal";
import { Panel, Tab } from "../ui";

type RightTab = "ast" | "file";

export function Ast() {
  const [tab, setTab] = useState<RightTab>("file");

  return (
    <div className="min-h-screen bg-white pt-16">
      <main className="flex h-[calc(100vh-4rem)]">
        <Panel>
          <Terminal />
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
          <div className="flex-1 min-h-0">
            {tab === "ast" ? <AstCanvas /> : <FileView />}
          </div>
        </Panel>
      </main>
    </div>
  );
}