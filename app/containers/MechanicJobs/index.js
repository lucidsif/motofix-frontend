/*
 *
 * MechanicJobs
 *
 */

import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import calendar from './calendar.png';
import moneyBag from './money-bag.png';
import repairing from './repairing.png';

export class MechanicJobs extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="pusher">

        <div className="ui inverted vertical masthead center aligned segment mechanic-job-image">
          <Header as="h1">Get the pay you deserve <br /> Work when you want <br /> <b><i>Both.</i></b> </Header>
          <a
            className="ui orange huge circular button mechanicMarginUp"
            href={'https://docs.google.com/a/motofixes.com/forms/d/e/1FAIpQLSeSqfqmAfxGJDTeXzaaaeZHgCSO-Qxz1ecQqTr2-kQmAlrByg/viewform'}
          >Apply Now</a>
        </div>

        <div className="ui vertical stripe segment padHeaderLess">
          <div className="ui equal width stackable grid">
            <div className="center aligned row">
              <div className="column">
                <h2 className="whyMechanicHeader">Why work as a mobile motorcycle mechanic?</h2>
              </div>
            </div>
            <div className="center aligned row">
              <div className="column">
                <h3>The Pay You Deserve</h3>
                <p>Make up to $45/hr.</p>
                <Image size="tiny" src={moneyBag} centered />
              </div>
              <div className="column">
                <h3>{"You're the Boss"}</h3>
                <p>Want to work 7 days a week or just want to work a single day a week? You tell us. You are the boss. </p>
                <Image size="tiny" src={calendar} centered />
              </div>
              <div className="column">
                <h3>Simplier Work</h3>
                <p>{"We handle the parts ordering, appointment booking, warranties, insurance, customer support, payments, and technology so you don't have to."}</p>
                <Image size="tiny" src={repairing} centered />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


MechanicJobs.propTypes = {
  client: React.PropTypes.object,
};

export default MechanicJobs;
