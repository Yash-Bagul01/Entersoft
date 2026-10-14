import fs from "fs";
import path from "path";
import ts from "typescript";

const configPath = path.resolve("tsconfig.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));
const options = { ...parsed.options, noUnusedLocals: true, noUnusedParameters: true };
console.log("files", parsed.fileNames.length, "unused", options.noUnusedLocals);
const program = ts.createProgram(parsed.fileNames, options);
const all = ts.getPreEmitDiagnostics(program);
console.log("all diags", all.length, "codes", [...new Set(all.map((d) => d.code))].slice(0, 20));

const diags = all.filter(
  (d) =>
    d.file &&
    (d.code === 6133 || d.code === 6192 || d.code === 6198) &&
    /[/\\]src[/\\]/.test(d.file.fileName)
);

const kinds = {};
const interesting = [];
for (const d of diags) {
  const sf = d.file;
  const node = find(sf, d.start);
  const kind = node ? ts.SyntaxKind[node.kind] : "missing";
  const parent = node?.parent ? ts.SyntaxKind[node.parent.kind] : "";
  const gp = node?.parent?.parent ? ts.SyntaxKind[node.parent.parent.kind] : "";
  const key = `${d.code}:${kind}/${parent}/${gp}`;
  kinds[key] = (kinds[key] || 0) + 1;
  if (!key.includes("Import") && interesting.length < 40) {
    const text = node ? node.getText(sf).slice(0, 80) : "";
    interesting.push(`${path.relative(process.cwd(), sf.fileName)}:${sf.getLineAndCharacterOfPosition(d.start).line + 1} ${key} ${text}`);
  }
}
console.log("diags", diags.length);
console.log(Object.entries(kinds).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${v} ${k}`).join("\n"));
console.log("---");
console.log(interesting.join("\n"));

function find(sf, pos) {
  function walk(node) {
    if (pos < node.getStart(sf) || pos >= node.getEnd()) return null;
    let hit = node;
    node.forEachChild((child) => {
      const inner = walk(child);
      if (inner) hit = inner;
    });
    return hit;
  }
  return walk(sf);
}
