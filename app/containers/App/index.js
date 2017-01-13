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
// import Footer from 'components/Footer';

const AppWrapper = styled.div`
  max-width: calc(968px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

function App(props) {
  return (
    <AppWrapper>
      <Helmet
        link={[
        { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css' },
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
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
