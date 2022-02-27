//using slightly modified version of Josh Comeau's global styles

import { createGlobalStyle } from "styled-components/macro";

const globalStyles = createGlobalStyle`
/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body, #root {
  height: 100%;
  font-family: 'Manrope', sans-serif;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root {
  isolation: isolate;
}

// CSS variables


html {
    --color-primary: hsl(209deg 100% 20%);
    --color-primary-dark: hsl(211deg 100% 12%);
    --color-secondary: hsl(46deg 100% 50%);
    --color-secondary-light: hsl(50deg 100% 52%);
    --color-black: hsl(216deg 100% 4%);
    --color-white: hsl(0deg 0% 100%);

}

`;

export default globalStyles;
