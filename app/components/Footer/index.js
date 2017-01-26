import React from 'react';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      <section>
        © 2017 motofix All rights reserved. Made with awesomeness in NYC.
      </section>
      <div>
        <a href="/privacy-policy">Privacy</a>
      </div>
      <div>
        <a href="/terms-and-conditions">Terms and Conditions</a>
      </div>
    </Wrapper>
  );
}

export default Footer;
