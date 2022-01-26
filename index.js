
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