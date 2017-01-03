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
      <ul>
<li className="active">1</li>
<li>2</li>
<li>3</li>
</ul>
      </Header>
    );
  }
}

export default QuoteProgressBar;
