import fs from "fs";
const lines = fs.readFileSync(".tmp-tsc.txt", "utf8").split(/\r?\n/).filter((l) => l.includes("error TS"));
const nonReact = lines.filter((l) => !l.includes("'React'"));
console.log("non-react", nonReact.length);
const names = {};
for (const line of nonReact) {
  const m = line.match(/'([^']+)'/);
  const name = m ? m[1] : "?";
  names[name] = (names[name] || 0) + 1;
}
console.log(
  Object.entries(names)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([k, v]) => v + " " + k)
    .join("\n")
);
