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
            </div>
          </div>
          <div className="three wide column">
            <h4 className="ui header">Other</h4>
            <div className="ui link list">
              <Link className="item" to="/faq">FAQ</Link>
              <Link className="item" to="/how-it-works">How It Works</Link>
              <Link className="item" to="/motorcycle-mechanic-jobs">Mechanic Careers</Link>
            </div>
          </div>
          <div className="seven wide column">
            <h4 className="ui  header">motofix</h4>
            <p>All rights reserved 2017.</p>
            <p>Call or text (929)356-4313 for any inquiries. You can also live chat with us anytime by clicking on the bubble on the bottom right.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
