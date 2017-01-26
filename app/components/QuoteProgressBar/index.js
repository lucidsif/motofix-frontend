/**
*
* QuoteProgressBar
*
*/

import React from 'react';
import { Progress, Segment, Label } from 'semantic-ui-react';

// TODO: incrementally fill progressbar
class QuoteProgressBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { percent: 15 };
  }
// TODO: Make sure progress bar is fully responsive and visible on mobile devices
  render() {
    var currentLocation = this.props.currentLocation
    console.log(currentLocation)

    var renderProgressStage = null
    if(currentLocation === '/quote/vehicle'){
      console.log('vehicle stage')
      renderProgressStage =
          <Segment className="quote" attached="top">
            <svg>
              <g>
                <line x1="20%" y1="10%" x2="90%" y2="10%"></line>
                <circle cx="90%" cy="10%" r="1.25em"></circle>
                <text x="90%" y="10%">3</text>
                <text className="stage" x="90%" y="30%">Schedule</text>
              </g>
              <g className>
                <line x1="10%" y1="10%" x2="20%" y2="10%"></line>
                <circle cx="50%" cy="10%" r="1.25em"></circle>
                <text x="50%" y="10%">2</text>
                <text className="stage" x="50%" y="30%">Services & Estimates</text>
              </g>
              <g className="active">
                <circle cx="10%" cy="10%" r="1.25em"></circle>
                <text x="10%" y="10%">1</text>
                <text className="stage" x="10%" y="30%">Vehicle Information</text>
              </g>
            </svg>
          </Segment>
    }
    else if(currentLocation = '/quote/service'){
      console.log('service stage')
      renderProgressStage =
        <Segment className="quote" attached="top">
          <svg>
            <g>
              <line x1="20%" y1="10%" x2="90%" y2="10%"></line>
              <circle cx="90%" cy="10%" r="1.25em"></circle>
              <text x="90%" y="10%">3</text>
              <text className="stage" x="90%" y="30%">Schedule</text>
            </g>
            <g className="active">
              <line x1="10%" y1="10%" x2="20%" y2="10%"></line>
              <circle cx="50%" cy="10%" r="1.25em"></circle>
              <text x="50%" y="10%">2</text>
              <text className="stage" x="50%" y="30%">Services & Estimates</text>
            </g>
            <g className="completed">
              <circle cx="10%" cy="10%" r="1.25em"></circle>
              <text x="10%" y="10%">1</text>
              <text className="stage" x="10%" y="30%">Vehicle Information</text>
            </g>
          </svg>
        </Segment>
    }
    return renderProgressStage
  }
}

export default QuoteProgressBar;
