import React from 'react';
import { Label } from 'semantic-ui-react';

function Footer() {
  return (
    <div className="ui vertical footer segment">
      <div className="ui container">
        <div className="ui stackable  divided equal height stackable grid">
          <div className="three wide column">
            <h4 className="ui  header">About</h4>
            <div className="ui  link list">
              <a className="item" href="/terms-and-conditions">Terms And Conditions</a>
              <a className="item" href="/privacy-policy">Privacy Policy</a>
              <a href="javascript:void(Tawk_API.toggle())"> Click To Chat </a>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="ui header">Other</h4>
            <div className="ui link list">
              <a className="item" href="/faq">FAQ</a>
              <a className="item" href="/how-it-works">How It Works</a>
              <a className="item" href="/motorcycle-mechanic-jobs">Mechanic Careers</a>
            </div>
          </div>
          <div className="seven wide column">
            <h4 className="ui  header">motofix</h4>
            <p>All rights reserved 2017.</p>
            <form>
              <Label
                icon="call"
                content="Need Help? Call Support @ (929)356-4313"
                color="blue"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
