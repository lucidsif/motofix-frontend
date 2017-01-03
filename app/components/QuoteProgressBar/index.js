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
              <line x1="20%" y1="50%" x2="95%" y2="50%"></line>
              <circle cx="95%" cy="50%" r="1.25em"></circle>
              <text x="95%" y="50%">3</text>
            </g>
            <g className>
              <line x1="5%" y1="50%" x2="20%" y2="50%"></line>
              <circle cx="50%" cy="50%" r="1.25em"></circle>
              <text x="50%" y="50%">2</text>
            </g>
            <g className="active">
              <circle cx="5%" cy="50%" r="1.25em"></circle>
              <text x="5%" y="50%">1</text>
            </g>
            </svg>
      </Header>
    );
  }
}

export default QuoteProgressBar;
