import React, { PropTypes } from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export class ApolloTest extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    // loading: PropTypes.bool,
    motorcycles: PropTypes.array,
  };

  render() {
    /*
    if (!this.props.loading) {
      return <span style={{ fontSize: '1rem' }}>Loading...</span>;
    }
    */
    if (!this.props.motorcycles) {
      return <div>Loading</div>;
    }
    const posts = this.props.motorcycles.map(
      (motorcycle) => <div style={{ fontSize: '1rem' }}>{motorcycle.model}</div>
    );

    return <div>{posts}</div>;
  }
}

const TEST_QUERY = gql`
  query allMotorcycles($filterByMake: String!, $filterByYear: Int){
    model
  }
`;

const withData = graphql(TEST_QUERY, {
  options: {
    variables: {
      filterByMake: 'bmw',
      filterByYear: 2009,
    },
  },
  props: ({ data: { allMotorcycles } }) => ({
    motorcycles: allMotorcycles,
  }),
});

export default withData(ApolloTest);
