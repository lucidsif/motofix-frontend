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
        <text> Vehicle Information----------------------------------------------Services & Estimate----------------------------------------------Schedule </text>
        <Progress percent={this.state.percent} indicating />
      </Header>
    );
  }
}

export default QuoteProgressBar;
