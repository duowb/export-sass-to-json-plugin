import { defineConfig } from 'rollup';
import sassToJsonPlugin from './index'
const pkg = require('./package.json')

export default defineConfig({
  input: 'test.js',
  output: [
    { file: pkg.main, name: 'theme', format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  plugins: [
    sassToJsonPlugin()
  ]
})