# export-sass-to-json-plugin
Convert the exported sass to json


 index.scss
``` sass
:export {
  font-size:20px;
  color:red
}
```
  index.js
```javascript
const postcssScss = require('postcss-scss');
export default function () {
  return {
    transform(code, filePath) {
      if (filePath.endsWith('scss')) {
        const root = postcssScss.parse(code);
        const cssData = {};
        root.walkDecls((i) => {
          cssData[i.prop] = i.value
        })
        return {
          code: `export default ${JSON.stringify(cssData)}`,
          map: { mappings: '' }
        };
      }
    }
  }
}

```


 test.js
``` javascript
import index from './index.scss'
console.log(index)
```

rollup.config.js
``` javascript
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
```