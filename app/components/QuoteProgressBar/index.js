/**
*
* QuoteProgressBar
*
*/

import React from 'react';
import { Progress, Header } from 'semantic-ui-react';


class QuoteProgressBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { percent: 15 };
  }


  render() {
    return (
      <Header as="h5" attached="top">
      <svg>
            <g>
              <line x1="20%" y1="40%" x2="95%" y2="40%"></line>
              <circle cx="95%" cy="40%" r="1.25em"></circle>
              <text x="95%" y="40%">3</text>
              <text className="stage" x="95%" y="60%">Schedule</text>
            </g>
            <g className>
              <line x1="5%" y1="40%" x2="20%" y2="40%"></line>
              <circle cx="50%" cy="40%" r="1.25em"></circle>
              <text x="50%" y="40%">2</text>
              <text className="stage" x="50%" y="60%">Services & Estimates</text>
            </g>
            <g className="active">
              <circle cx="7%" cy="40%" r="1.25em"></circle>
              <text x="7%" y="40%">1</text>
              <text className="stage" x="7%" y="60%">Vehicle Information</text>
            </g>
            </svg>
      </Header>
    );
  }
}

export default QuoteProgressBar;
