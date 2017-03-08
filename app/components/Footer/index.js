import React from 'react';
import { Link } from 'react-router';
import { Button } from 'semantic-ui-react';

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
            <form action="tel:9293564313">
              <Button
                type="submit"
                icon="call"
                content="Need Help? Call Support @ (929)356-4313"
                color="blue"
                circular
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
