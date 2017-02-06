/*
 *
 * Landing
 *
 */
import React from 'react';
import { Link } from 'react-router';
import { withApollo } from 'react-apollo';


import logo from './logo.png';
import greatIdea from './great-idea.png';
import gladIdea from './glad-read.png';
import likeIdea from './like-idea.png';
import fellowDev from './fellow-dev.png';
import { Image } from 'semantic-ui-react';
import FormModal from 'components/FormModal';

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
                <p>All work is backed by our 6 month, 5,000 mile warranty.</p>
              </div>
              <div className="column">
                <h3>Save Money</h3>
                <p>Up-front, consistent pricing that is up to 30% lower than your local dealership. </p>
              </div>
            </div>
            <div className="center aligned row">
              <div className="column">
                <h3>Convenience & Ease</h3>
                <p>Get quotes on your phone or on your computer, anytime.</p>
                <p>No more quote shopping, taxis, buses, begging rides from friends, rushing after work, or driving back and forth between maintenance. </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe segment">
          <div className="ui text container">
            <h3 className="ui header">Breaking The Grid, Grabs Your Attention</h3>
            <p>Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.</p>
            <a className="ui large button">Read More</a>
            <h4 className="ui horizontal header divider">
              <a href="#">Case Studies</a>
            </h4>
            <h3 className="ui header">Did We Tell You About Our Bananas?</h3>
            <p>Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.</p>
            <a className="ui large button">I'm Still Quite Interested</a>
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

/*
 <div className="row">
 <div className="center aligned column">
 <FormModal client={this.props.client} />
 </div>
 </div>
 */
