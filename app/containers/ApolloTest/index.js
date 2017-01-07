import React, { PropTypes } from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export class ApolloTest extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool,
    motorcycles: PropTypes.array,
  };

  render() {
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

/*

const WINTERIZATION_QUERY = gql`
{
  laborEstimates(service: "Winterization"){
    response
  }
}
`;

const withWinterizationData = graphql(WINTERIZATION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    winterization: laborEstimates.response,
  }),
});

//QuoteCentral = withWinterizationData(QuoteCentral);
*/
