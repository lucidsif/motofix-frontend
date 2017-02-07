/*
 *
 * HowItWorks
 *
 */

import React from 'react';
import { Image } from 'semantic-ui-react';
import fiveStepsInfographic from './5steps.png';


export class HowItWorks extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="ui vertical stripe segment">
        <div className="ui text container">
          <Image size="huge" src={fiveStepsInfographic} centered />
        </div>
      </div>
    );
  }
}

export default HowItWorks;
