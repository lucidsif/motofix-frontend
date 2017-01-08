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
`;

const AIR_FILTER_REPLACEMENT_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const BRAKE_PAD_REPLACEMENT_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const BRAKES_ARE_SQUEAKING_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const CHAIN_AND_SPROCKET_REPLACEMENT_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const CHECK_ENGINE_AND_FI_LIGHT_IS_ON_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const CLEAN_AND_LUBE_CHAIN_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const FLUIDS_ARE_LEAKING_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const MOTORCYCLE_IS_NOT_STARTING_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const MOTORCYCLE_IS_OVERHEATING_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const NY_STATE_INSPECTION_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const OIL_CHANGE_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const PRE_PURCHASE_INSPECTION_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const SMOKE_OR_STEAM_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const SPONGY_BRAKING_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const SUSPENSION_TUNING_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const TIRE_REPLACEMENT_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const VALVE_ADJUSTMENT_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;
const WARNING_LIGHT_QUERY = gql`
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
//////// graphql containers
// POST QUERY PROP VARIABLES ARE VERY IMPORTANT SINCE THEY ARE DYNAMICALLY ACCESSED BY QUOTECART
export const withAccessoryInstallationData = graphql(ACCESSORY_INSTALLATION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AccessoryInstallation: laborEstimates,
  }),
});
export const withAirFilterReplacementData = graphql(AIR_FILTER_REPLACEMENT_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const withOilChangeData = graphql(OIL_CHANGE_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    OilChange: laborEstimates,
  }),
});
export const withWinterizationData = graphql(WINTERIZATION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    Winterization: laborEstimates,
  }),
});

