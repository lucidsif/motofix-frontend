import React from 'react';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <div className="ui vertical footer segment">
      <div className="ui container">
        <div className="ui stackable  divided equal height stackable grid">
          <div className="three wide column">
            <h4 className="ui  header">About</h4>
            <div className="ui  link list">
              <a href="#" className="item">Sitemap</a>
              <a href="#" className="item">Contact Us</a>
              <a href="#" className="item">Religious Ceremonies</a>
              <a href="#" className="item">Gazebo Plans</a>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="ui  header">Services</h4>
            <div className="ui  link list">
              <a href="#" className="item">Banana Pre-Order</a>
              <a href="#" className="item">DNA FAQ</a>
              <a href="#" className="item">How To Access</a>
              <a href="#" className="item">Favorite X-Men</a>
            </div>
          </div>
          <div className="seven wide column">
            <h4 className="ui  header">Footer Header</h4>
            <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
