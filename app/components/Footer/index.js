import React from 'react';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      <section>
        © 2017 motofix All rights reserved.
        <a href="/privacy-policy" className="footer-link">Privacy</a>
        <a href="/terms-and-conditions" className="footer-link">Terms and Conditions</a>
      </section>
    </Wrapper>
  );
}

export default Footer;
