import { useFileStore } from "../store/fileStore";
import { presets } from "../store/presets";
import { Tab } from "../ui";

export function FileView() {
  const content = useFileStore((s) => s.content);
  const active = useFileStore((s) => s.active);
  const setContent = useFileStore((s) => s.setContent);
  const loadPreset = useFileStore((s) => s.loadPreset);
  const loadCustom = useFileStore((s) => s.loadCustom);

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 gap-2">
      <div className="flex gap-2">
        <Tab active={active === "custom"} size="sm" onClick={loadCustom}>
          try your own!
        </Tab>
        {Object.keys(presets).map((name) => (
          <Tab key={name} active={active === name} size="sm" onClick={() => loadPreset(name)}>
            {name}.lox
          </Tab>
        ))}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck={false}
        className="flex-1 resize-none bg-white text-gray-900 font-mono text-sm p-2 border border-gray-300 rounded outline-none focus:border-gray-500"
        placeholder= {`print "hello world";` }
      />
    </div>
  );
}
