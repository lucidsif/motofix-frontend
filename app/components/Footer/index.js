import React from 'react';
import { Link } from 'react-router';

function Footer() {
  return (
    <div className="ui vertical footer segment">
      <div className="ui container">
        <div className="ui stackable  divided equal height stackable grid">
          <div className="three wide column">
            <h4 className="ui  header">About</h4>
            <div className="ui  link list">
              <Link className="item" to="/terms-and-conditions">Terms And Conditions</Link>
              <Link className="item" to="/privacy-policy">Privacy Policy</Link>
              <Link className="item" to="/contact-us">Contact Us</Link>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="ui header">Other</h4>
            <div className="ui link list">
              <Link className="item" to="/faq">FAQ</Link>
              <Link className="item" to="/how-it-works">How It Works</Link>
              <a
                className="item"
                href={'https://docs.google.com/a/motofixes.com/forms/d/e/1FAIpQLSeSqfqmAfxGJDTeXzaaaeZHgCSO-Qxz1ecQqTr2-kQmAlrByg/viewform'}
              >Mechanic Careers</a>
            </div>
          </div>
          <div className="seven wide column">
            <h4 className="ui  header">motofix</h4>
            <p>All rights reserved 2017.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
