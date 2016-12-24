import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,

  .background-img{
    background: url(http://res.cloudinary.com/motocloud/image/upload/v1482555076/motowoman_uuhdtx.png) no-repeat center center fixed;
    background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -webkit-background-size: cover;
  }

  .nav-link{
    color: #fafafa;
  }

  .navbar-brand{
    color: #fafafa;
  }

  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }


  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
