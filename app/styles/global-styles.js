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
    padding-top: 40px;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .ui.top.attached.segment.quote{
    max-height: 70px;
      margin-top: 2em;
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

.serviceIcon{
  float: right;
}

.blueIcon {
  color: #1abc9c;
}

.redIcon {
  color: red;
}

.iconText {
  margin-top: 1em;
  margin-bottom: 1em;
  color: #34495e;
}

.serviceSearchWidth {
  width: 300px;
}

.verticalScroll {
  height: 300px;
  overflow-y: scroll;
}

.totalPriceNum {
  padding-bottom: 1em;
}

.service-span {
    font-size: 1.2em;
}

.part-span {
    font-size: 1em;
}

.padRight {
    padding-right: 5em;
}

.ui.menu .item>i.icon {
    color: gray;
}

.ui.secondary.menu .item {
    padding-right: 2.2em;
}

h3.ui.center.aligned.header {
  font-weight: 500;
}
`
;
