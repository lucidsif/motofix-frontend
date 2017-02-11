/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';


import Header from 'components/Header';
// TODO: Fix footer so it's always at bottom
import Footer from 'components/Footer';


// TODO: add and ensure footer stays on the bottom of every page
function App(props) {
  let AppWrapper;
  let FooterWrapper;
  if (props.location.pathname === '/') {
    AppWrapper = styled.div`
`;
    FooterWrapper = styled.div`
`;
  } else {
    AppWrapper = styled.div`
  max-width: calc(968px + 16px * 2);
  margin: 0 auto;
  margin-bottom: 2em;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

    FooterWrapper = styled.div`
  max-width: calc(968px + 16px * 2);
  margin: 0 auto;
  margin-bottom: 2em;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;
  }
  return (
    <div>
      <AppWrapper>
        <Helmet
          link={[
            { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' },
            { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' },
          ]}
          titleTemplate="%s - motofix"
          defaultTitle="motofix"
          meta={[
            { name: 'description', content: 'motofix' },
          ]}
        />
        <Header />
        {React.Children.toArray(props.children)}
      </AppWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </div>

  );
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};

export default App;
