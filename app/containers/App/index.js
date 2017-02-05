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
  console.log(props)
  var AppWrapper;
if(props.location.pathname === '/') {
  AppWrapper = styled.div`
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
}

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
  return (
      <AppWrapper>
        <Helmet
          link={[
            { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css' },
          ]}
          script={[
            { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAVnEr30TZi8hdLf7UZsYTv8HjekSiGpYA&libraries=places', type: 'text/javascript' },
          ]}
          titleTemplate="%s - motofix"
          defaultTitle="motofix"
          meta={[
            { name: 'description', content: 'motofix' },
          ]}
        />
        <Header />
        {React.Children.toArray(props.children)}
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
      </AppWrapper>

  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
/*
 <Input
 onBlur={this.validateAndUpdateZip}
 icon="location arrow"
 placeholder="Zipcode of motorcycle"
 size="large"
 />
// use this message 4 geosgggest

 */
