/**
*
* QuoteProgressBar
*
*/

import React from 'react';
import { Progress, Segment, Label } from 'semantic-ui-react';

// TODO: Make sure progress bar is fully responsive and visible on mobile devices
// TODO: Determine if model or vehicle information should be in step 1
// TODO: incrementally fill progressbar
class QuoteProgressBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    var { currentLocation, selectedVehicle } = this.props;
    var year = selectedVehicle.year
    var make = selectedVehicle.manufacturer;
    var model = selectedVehicle.model;

    var renderProgressStage = null
    if(currentLocation === '/quote/vehicle'){
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
              <text className="stage" x="10%" y="30%">{year} {make} {model}</text>
            </g>
          </svg>
        </Segment>
    }
    return renderProgressStage
  }
}

export default QuoteProgressBar;
