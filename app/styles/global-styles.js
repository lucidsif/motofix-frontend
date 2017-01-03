import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
html, body {
  height:100%;
}

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #ffffff;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .ui.top.attached.header.quote{
    max-height: 70px;
  }

svg {
  width: 100%;
  /*This goes here because SVG uses em as units*/
  font: normal 9pt sans-serif;
}
svg g line {
  stroke: #ecf0f1;
  stroke-width: 2px;
}
svg g.active line,
svg g.active ~ g line {
  stroke: orange;
}
svg g circle {
  fill: #95a5a6;
}
svg g.active circle,
svg g.active ~ g circle {
  fill: orange;
}
svg g text {
  fill: white;
  text-anchor: middle;
  dominant-baseline: central;
}
svg g.active text,
svg g.active ~ g text {
  fill: #FFF;
}
/* Make the active group bigger*/

/* Use 'pointer' cursor*/

svg g circle,
svg g text {
  cursor: pointer;
}

svg g text.stage {
  fill: gray;
  text-anchor: middle;
  dominant-baseline: central;
}
.ui.top.attached.header {
    min-width: 100%;
    margin-top: 2em;
}
`
;
