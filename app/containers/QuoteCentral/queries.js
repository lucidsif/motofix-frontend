/**
 * Created by Sif on 1/7/17.
 */
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const ACCESSORY_INSTALLATION_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}

`;const OIL_CHANGE_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;

const WINTERIZATION_QUERY = gql`
{
  laborEstimates(service: "Winterization"){
    response
  }
}
`;

export const withOilChangeData = graphql(OIL_CHANGE_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    OilChange: laborEstimates,
  }),
});

export const withAccessoryInstallationData = graphql(OIL_CHANGE_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AccessoryInstallation: laborEstimates,
  }),
});

export const withWinterizationData = graphql(WINTERIZATION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    Winterization: laborEstimates,
  }),
});

