import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const terserOptions = {
    format: {
      beautify: true, //Keeps indentation and whitespace
      comments: false //remove all comments
  },
  compress: false,
  mangle: false
};

export default [
  // ✅ Browser build (IIFE)
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/wavblock.js",
        format: "iife",
        name: "WavBlock",
        plugins: [terser(terserOptions)] // remove comments, readable
      },
      {
        file: "dist/wavblock.min.js",
        format: "iife",
        name: "WavBlock",
        plugins: [terser({ format: { comments: false } })] // minified & no comments
      }
    ],
    plugins: [resolve(), commonjs()]
  },

  // ✅ ESM build
  {
    input: "src/index.js",
    output: {
        file: "dist/wavblock.mjs",
        format: "es",
        plugins: [terser({ format: { comments: false } })]
    },
    plugins: [resolve(), commonjs()]
  },

  // ✅ CommonJS build
  {
    input: "src/index.js",
    output: {
        file: "dist/wavblock.cjs",
        format: "cjs",
        plugins: [terser({ format: { comments: false } })]
    },
    plugins: [resolve(), commonjs()]
  }
];
