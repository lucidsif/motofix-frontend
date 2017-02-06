/*
 *
 * Landing
 *
 */
import React from 'react';
import { Link } from 'react-router';
import logo from './logo.png';
import greatIdea from './great-idea.png';
import gladIdea from './glad-read.png';
import likeIdea from './like-idea.png';
import anyTimeQuote from './anytime-quote.png';
import fellowDev from './fellow-dev.png';
import { Image } from 'semantic-ui-react';
import FormModal from 'components/FormModal'

// TODO: convert to functional component

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

        <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container">
            <div className="center aligned row">
              <div className="column">
                <h3>What do riders on the internet have to say about us?</h3>
              </div>
            </div>
            <div className="row">
              <div className="eight wide column">
                <img src={greatIdea} className="ui huge rounded image" />
              </div>
              <div className="eight wide column">
                <img src={gladIdea} className="ui huge rounded image" />
              </div>
            </div>
            <div className="row">
              <div className="eight wide column">
                <img src={likeIdea} className="ui huge rounded image" />
              </div>
              <div className="eight wide column">
                <img src={fellowDev} className="ui huge rounded image" />
              </div>
            </div>
            <div className="row">
              <div className="center aligned column">
                <FormModal />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Landing;
