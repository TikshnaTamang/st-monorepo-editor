"./styles.css" ;"./dist/index.css"

// : This means that if someone imports your-package/styles.css, it will resolve to the ./dist/index.css file.


"./card";"./src/card.tsx"

//  Similarly, if someone imports your-package/card, it will resolve to the ./src/card.tsx file.


  "exports"; {
    "./style"; "./dist/index.css",
    "."; {
      "import";"./dist/test-lib.js",
      "require"; "./dist/test-lib.cjs"
    }
  }

// the style is more specific export to importing applicaton
// EXAMPLE: import { style } from 'your-package/style';

// the "." is more DEFAULT export to importing applicaton
// EXAMPLE: import { EDITOR } from 'your-package';