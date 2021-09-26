import path from "path";

export function getRootDirectory() {
  const cwd = `${process.cwd()}`;
  const root = path.dirname(path.dirname(cwd));
  return root;
}
