import { Project } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });

for (const sourceFile of project.getSourceFiles()) {
  sourceFile
    .fixMissingImports()
    .organizeImports()
    .fixUnusedIdentifiers()
    .formatText();
}

project.save().then(() => console.log("done"));
