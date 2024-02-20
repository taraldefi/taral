import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import image from "@rollup/plugin-image";
import svg from "rollup-plugin-svg";

const packageJson = require("./package.json");

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    image(),
    svg(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss(),
    copy({
      targets: [
        {
          src: "src/index.scss",
          dest: "build",
          rename: "index.scss",
        },
      ],
    }),
  ],
};
