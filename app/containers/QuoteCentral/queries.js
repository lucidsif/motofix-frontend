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
export const AccessoryInstallationData = graphql(ACCESSORY_INSTALLATION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AccessoryInstallation: laborEstimates,
  }),
});
export const AirFilterReplacementData = graphql(AIR_FILTER_REPLACEMENT_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const BrakePadReplacementData = graphql(BRAKE_PAD_REPLACEMENT_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    BrakePadReplacement: laborEstimates,
  }),
});
export const BrakesSqueakingData = graphql(BRAKES_ARE_SQUEAKING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    BrakesAreSqueaking: laborEstimates,
  }),
});
export const ChainSprocketReplacementData = graphql(CHAIN_AND_SPROCKET_REPLACEMENT_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    Replacement: laborEstimates,
  }),
});
export const CheckEngineFiData = graphql(CHECK_ENGINE_AND_FI_LIGHT_IS_ON_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const CleanLubeChainData = graphql(CLEAN_AND_LUBE_CHAIN_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const FluidsLeakingData = graphql(FLUIDS_ARE_LEAKING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const MotorcycleNotStartingData = graphql(MOTORCYCLE_IS_NOT_STARTING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const MotorcycleOverheatingData = graphql(MOTORCYCLE_IS_OVERHEATING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const NyStateInspectionData = graphql(NY_STATE_INSPECTION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const OilChangeData = graphql(OIL_CHANGE_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    OilChange: laborEstimates,
  }),
});
export const PrePurchaseInspectionData = graphql(PRE_PURCHASE_INSPECTION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const SmokeOrSteamData = graphql(SMOKE_OR_STEAM_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const SpongyBrakingData = graphql(SPONGY_BRAKING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const SuspensionTuningData = graphql(SUSPENSION_TUNING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const TireReplacementData = graphql(TIRE_REPLACEMENT_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const ValveAdjustmentData = graphql(VALVE_ADJUSTMENT_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const WarningLightData = graphql(WARNING_LIGHT_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    AirFilterReplacement: laborEstimates,
  }),
});
export const WinterizationData = graphql(WINTERIZATION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    Winterization: laborEstimates,
  }),
});

