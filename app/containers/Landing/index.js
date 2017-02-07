/*
 *
 * Landing
 *
 */
import React from 'react';
import { Link } from 'react-router';
import { withApollo } from 'react-apollo';
import FormModal from 'components/FormModal';
import { Image } from 'semantic-ui-react';

import fellowDev from './fellow-dev.png';
import logo from './logo.png';
import greatIdea from './great-idea.png';
import gladIdea from './glad-read.png';
import likeIdea from './like-idea.png';

import mechanicIcon from './mechanic.png';
import piggyBank from './piggy-bank.png';
import controller from './controller.png';
import fiveSteps from './5steps2.png';

// TODO: Create successful signup mutation message
export class Landing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="pusher">
        <div className="ui inverted vertical masthead center aligned segment landing-image">
          <Image size="large" src={logo} centered className="padUp" />
          <Link
            className="ui orange huge circular button"
            to="/quote/vehicle"
          >
            Get a free quote
          </Link>
        </div>

        <div className="ui vertical stripe segment padSegmentTop">
          <div className="ui middle aligned stackable grid container">
            <div className="center aligned row">
              <div className="column">
                <h3>What do riders on the internet have to say about us?</h3>
              </div>
            </div>
            <div className="row">
              <div className="eight wide column">
                <Image src={greatIdea} size="huge" />
              </div>
              <div className="eight wide column">
                <Image src={gladIdea} size="huge" />
              </div>
            </div>
            <div className="row">
              <div className="eight wide column">
                <Image src={likeIdea} size="huge" />
              </div>
              <div className="eight wide column">
                <Image src={fellowDev} size="huge" />
              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe quote segment">
          <div className="ui equal width stackable internally celled grid">

            <div className="center aligned row">
              <div className="column">
                <h3>Honest, Professional Mechanics</h3>
                <p>You only get the best and all work is backed by our 5,000 mile warranty.</p>
                <Image size="tiny" src={mechanicIcon} centered />
              </div>
              <div className="column">
                <h3>Save Money</h3>
                <p>Up-front pricing that is up to 30% lower than your local dealership. </p>
                <Image size="tiny" src={piggyBank} centered />
              </div>
            </div>
            <div className="center aligned row">
              <div className="column">
                <h3>Convenience & Ease</h3>
                <p>Get instant, free quotes on your phone or on your computer, anytime. <br />
                  No more quote shopping, taxis, buses, begging rides from friends, rushing after work, or driving back and forth between maintenance. <br />
                  Now you can use the extra time and cognitive resources to do more important things, like videogames. <br />
                </p>
                <Image size="tiny" src={controller} centered />
              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe segment">
          <div className="ui text container">
            <Image size="huge" src={fiveSteps} centered />
            <h4 className="ui horizontal header divider">
              Well, what are you waiting for?
            </h4>
            <p>{"We believe you'll love us so much that we're giving you $15 off your next service if you sign up during this beta period."}</p>
            <FormModal client={this.props.client} />
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  client: React.PropTypes.object,
};

const LandingWithApollo = withApollo(Landing);

export default LandingWithApollo;
