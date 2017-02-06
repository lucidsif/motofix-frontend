import React from 'react';

function Footer() {
  return (
    <div className="ui vertical footer segment">
      <div className="ui container">
        <div className="ui stackable  divided equal height stackable grid">
          <div className="three wide column">
            <h4 className="ui  header">About</h4>
            <div className="ui  link list">
              <a href="#" className="item">Terms and Conditions</a>
              <a href="#" className="item">Privacy Policy</a>
              <a href="#" className="item">Contact Us</a>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="ui  header">Other</h4>
            <div className="ui  link list">
              <a href="#" className="item">How it works</a>
              <a href="#" className="item">FAQ</a>
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
