/*
 *
 * Faq
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

export class Faq extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Faq"
          meta={[
            { name: 'description', content: 'Description of Faq' },
          ]}
        />
        In Progress
      </div>
    );
  }
}

export default Faq;
