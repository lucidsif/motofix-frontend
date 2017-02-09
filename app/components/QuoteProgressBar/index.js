/**
*
* QuoteProgressBar
*
*/

import React from 'react';
import { Segment } from 'semantic-ui-react';

// TODO: if motorcycle is selected, prioritize displaying that over Motorcycle information
// TODO: Determine if model or vehicle information should be in step 1
// TODO: incrementally fill progressbar
class QuoteProgressBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { selectedVehicle, currentLocation } = this.props;
    const year = selectedVehicle.year;
    const make = selectedVehicle.manufacturer;
    const model = selectedVehicle.model;

    let renderModelOrDescription;
    if (year && make && model) {
      renderModelOrDescription = `${year} ${make} ${model}`;
    } else {
      renderModelOrDescription = 'Motorcycle Information';
    }

    let renderProgressStage = null;
    if (currentLocation === '/quote/vehicle') {
      renderProgressStage = (
        <Segment className="quote" attached="top">
          <svg>
            <g>
              <line x1="20%" y1="10%" x2="87%" y2="10%"></line>
              <circle cx="87%" cy="10%" r="1.25em"></circle>
              <text x="87%" y="10%">3</text>
              <text className="stage" x="87%" y="30%">Schedule</text>
            </g>
            <g>
              <line x1="13%" y1="10%" x2="20%" y2="10%"></line>
              <circle cx="50%" cy="10%" r="1.25em"></circle>
              <text x="50%" y="10%">2</text>
              <text className="stage" x="50%" y="30%">Services & Estimates</text>
            </g>
            <g className="active">
              <circle cx="13%" cy="10%" r="1.25em"></circle>
              <text x="13%" y="10%">1</text>
              <text className="stage" x="13%" y="30%">{renderModelOrDescription}</text>
            </g>
          </svg>
        </Segment>
      );
    }
    if (currentLocation === '/quote/services') {
      renderProgressStage = (
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
      );
    }
    if (currentLocation === '/quote/schedule') {
      renderProgressStage = (
        <Segment className="quote" attached="top">
          <svg>
            <g className="active">
              <line x1="20%" y1="10%" x2="90%" y2="10%"></line>
              <circle cx="90%" cy="10%" r="1.25em"></circle>
              <text x="90%" y="10%">3</text>
              <text className="stage" x="90%" y="30%">Schedule</text>
            </g>
            <g className="completed">
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
      );
    }
    return renderProgressStage;
  }
}

QuoteProgressBar.propTypes = {
  selectedVehicle: React.PropTypes.object,
  currentLocation: React.PropTypes.string,
};

export default QuoteProgressBar;
