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

li {
  width: 2em;
  height: 2em;
  text-align: center;
  line-height: 2em;
  border-radius: 1em;
  background: dodgerblue;
  margin: 0 5vw 0 5vw;
  display: inline-block;
  color: white;
  position: relative;
}

li::before{
  content: '';
  position: absolute;
  top: .9em;
  left: -11vw;
  width: 11vw;
  height: .2em;
  background: dodgerblue;
  z-index: -1;
}


li:first-child::before {
  display: none;
}

.active {
  background: orange;
}

.active ~ li {
  background: lightblue;
}

.active ~ li::before {
  background: lightblue;
}
.ui.top.attached.header {
    min-width: 100%;
    margin-top: 2em;
}
`
;
