/**
*
* QuoteProgressBar
*
*/

import React from 'react';
import { Segment, Progress } from 'semantic-ui-react';


class QuoteProgressBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { percent: 15 };
  }


  render() {
    return (
      <Segment attached="top">
        <text> Vehicle Information----------------------------------------------Services & Estimate----------------------------------------------Schedule </text>
        <Progress percent={this.state.percent} indicating />
      </Segment>
    );
  }
}

export default QuoteProgressBar;
