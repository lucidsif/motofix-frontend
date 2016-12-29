import React, { PropTypes } from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export class ApolloTest extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool,
    motorcycles: PropTypes.array,
  };

  render() {
    console.log(bikes);

    if (this.props.loading) {
      return <span style={{ fontSize: '1rem' }}>Loading...</span>;
    }
    const bikes = this.props.motorcycles.map(
      (bike) => <div key={bike.id} className="segment">{bike.model}</div>);
    return <div className="container">{bikes}</div>;
  }
}

const TEST_QUERY = gql`
{
  allMotorcycles(filterByYear: 2009, filterByMake: "honda"){
    id
    make
    model
  }
}
`;

const withData = graphql(TEST_QUERY, {
  props: ({ data: { loading, allMotorcycles } }) => ({
    loading,
    motorcycles: allMotorcycles,
  }),
});

export default withData(ApolloTest);
