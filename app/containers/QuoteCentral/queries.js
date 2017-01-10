/**
 * Created by Sif on 1/7/17.
 */
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//TODO: 7.5/10 See if you can add a reducer to winterization so it changes the state of cart[Winterization]laborTime
// TODO: 6/10 Use fragments instead of queries?

const ACCESSORY_INSTALLATION_QUERY = gql`
query laborEstimates($vehicle: String, $service: String) {
  laborEstimates(vehicle: $vehicle, service: $service) {
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
query laborEstimates($vehicle: String, $service: String) {
  laborEstimates(vehicle: $vehicle, service: $service) {
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
query laborEstimates($vehicle: String, $service: String) {
  laborEstimates(vehicle: $vehicle, service: $service) {
    response
  }
}
`;

//////// graphql containers
// POST QUERY PROP VARIABLES ARE VERY IMPORTANT SINCE THEY ARE DYNAMICALLY ACCESSED BY QUOTECART
export const AccessoryInstallationData = graphql(ACCESSORY_INSTALLATION_QUERY, {
  options: ( ownProps ) => ({ variables: { vehicle: ownProps.vehicle.appended, service: 'Oil Change' } }),
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
    ChainAndSprocketReplacement: laborEstimates,
  }),
});
export const CheckEngineFIData = graphql(CHECK_ENGINE_AND_FI_LIGHT_IS_ON_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    CheckEngineOrFILightIsOn: laborEstimates,
  }),
});
export const CleanLubeChainData = graphql(CLEAN_AND_LUBE_CHAIN_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    CleanAndLubeChain: laborEstimates,
  }),
});
export const FluidsLeakingData = graphql(FLUIDS_ARE_LEAKING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    FluidsAreLeaking: laborEstimates,
  }),
});
export const MotorcycleNotStartingData = graphql(MOTORCYCLE_IS_NOT_STARTING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    MotorcycleIsNotStarting: laborEstimates,
  }),
});
export const MotorcycleOverheatingData = graphql(MOTORCYCLE_IS_OVERHEATING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    MotorcycleIsOverheating: laborEstimates,
  }),
});
export const NyStateInspectionData = graphql(NY_STATE_INSPECTION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    NYStateInspection: laborEstimates,
  }),
});
export const OilChangeData = graphql(OIL_CHANGE_QUERY, {
  options: ( ownProps ) => ({ variables: { vehicle: ownProps.vehicle.appended, service: 'Oil Change' } }),
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    OilChange: laborEstimates,
  }),
});
export const PrepurchaseInspectionData = graphql(PRE_PURCHASE_INSPECTION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    PrepurchaseInspection: laborEstimates,
  }),
});
export const SmokeOrSteamData = graphql(SMOKE_OR_STEAM_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    SmokeOrSteamIsComingOutOfMotorcycle: laborEstimates,
  }),
});
export const SpongyBrakingData = graphql(SPONGY_BRAKING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    SpongyBraking: laborEstimates,
  }),
});
export const SuspensionTuningData = graphql(SUSPENSION_TUNING_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    SuspensionTuning: laborEstimates,
  }),
});
export const TireReplacementData = graphql(TIRE_REPLACEMENT_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    TireReplacement: laborEstimates,
  }),
});
export const ValveAdjustmentData = graphql(VALVE_ADJUSTMENT_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    ValveAdjustment: laborEstimates,
  }),
});
export const WarningLightData = graphql(WARNING_LIGHT_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    WarningLightIsOn: laborEstimates,
  }),
});
export const WinterizationData = graphql(WINTERIZATION_QUERY, {
  options: ( ownProps ) => ({ variables: { vehicle: ownProps.vehicle.appended, service: 'Winterization' } }),
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    Winterization: laborEstimates,
  }),
});

// comment out winterization query
// modify onCartClick so it does an apollo.client.query
// add winterization query to a winterization prop
// make sure price is calculated from it
// * if async error, also extract loading