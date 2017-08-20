import rollupBabel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'

process.env.ROLLUP_BUILD = true
const minify = process.env.MINIFY

let targets

if (minify) {
  targets = [{dest: `dist/autocomplete-widget.umd.min.js`, format: 'umd'}]
} else {
  targets = [{dest: `dist/autocomplete-widget.umd.js`, format: 'umd'}]
}
export default {
  entry: 'src/index.js',
  targets,
  globals: {
    preact: 'preact',
  },
  format: 'umd',
  plugins: [
    nodeResolve({module: true, jsnext: true, main: true}),
    commonjs({include: 'node_modules/**'}),
    json(),
    rollupBabel({exclude: 'node_modules/**'}),
    minify ? uglify() : null,
  ].filter(Boolean),
}

// this is not transpiled
/*
  eslint
  max-len: 0,
  comma-dangle: [
    2,
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never'
    }
  ]
 */
