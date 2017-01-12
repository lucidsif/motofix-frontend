/**
*
* AddServices
*
*/

import React from 'react';
import { Grid, Segment, Input, Icon, Image, Label } from 'semantic-ui-react';
import toolIcon from './toolIcon.png';
import diagnoseIcon from './diagnoseIcon.png';
import gql from 'graphql-tag';

const services = ['Accessory Installation', 'Air Filter Replacement', 'Brake Pad Replacement', 'Brakes Are Squeaking', 'Chain And Sprocket Replacement', 'Check Engine Or FI Light Is On', 'Clean And Lube Chain', 'Fluids Are Leaking', 'Motorcycle Is Not Starting', 'Motorcycle Is Overheating', 'NY State Inspection', 'Prepurchase Inspection', 'Spongy Braking', 'Suspension Tuning', 'Tire Replacement', 'Valve Adjustment', 'Warning Light Is On', 'Winterization'];

// TODO: 6/10 Replace segments with animated list
// TODO: 5/10 Make text in segments responsive
// TODO: 3/10 make search input full width of the screen and responsive

// dispatch response to a reducer that updates the cart state laborTime with the payload
function AddServices(props) {

  function runServiceQuery(service) {
    console.log(`to be queried: ${service}`);
    let start = (new Date).getTime();
    props.props.client.query({
      query: gql`
          query laborEstimates($vehicle: String, $service: String) {
            laborEstimates(vehicle: $vehicle, service: $service) {
            response
          }
        }
      `,
      variables: { vehicle: props.props.vehicle.appended, service },
      // run onQueryLoad to dispatch setLaborTime action creator
    }).then((result) => props.props.onQueryLoad(service, JSON.parse(result.data.laborEstimates.response).time)).then((next) => console.log(`time to finish async & parse result for service query: ${(new Date).getTime() - start}`));
    // TODO: add a part query here that will dispatch a setPart action creator
    console.log(`to be queried: ${service}`);
    let start2 = (new Date).getTime();
    props.props.client.query({
      query: gql`
          query searchParts($vehicle: String, $service: String) {
            searchParts(vehicle: $vehicle, service: $service) {
            response
          }
        }
      `,
      variables: { vehicle: props.props.vehicle.appended, service },
      // run onQueryLoad to dispatch setLaborTime action creator
    }).then((result) => props.props.onPartsLoad(service, JSON.parse(result.data.searchParts[0].response)))
      .then((next) => console.log(`time to finish async & parse result for parts queries: ${(new Date).getTime() - start2}`))
    // run onCartClick to dispatch addToCart action creator
    props.props.onCartClick(service);
  }

  const ServiceSegments = () => {
    return services.map((service) => {
      // in case despacing all the services  is required, this is the function needed
      let propifiedService = service.replace(/\s/g, "");
      return (
        <Segment attached textAlign="left" key={service}>
          {service}
          {!props.props.cart[propifiedService].selected ? (
            <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => runServiceQuery(propifiedService)} link />
          ) : (
            <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick(propifiedService)} link />
          )}
        </Segment>
      );
    });
  };

  return (
    <Segment padded="very">
      <Grid centered>
        <Grid.Row>
          <Input className="serviceSearchWidth" icon="search" placeholder="Search services" />
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment textAlign="center">
              <Image as="a" centered size="mini" src={toolIcon} href="#" />
              <p className="iconText"> Repairs And Maintenance</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment textAlign="center">
              <Image as="a" centered size="mini" src={diagnoseIcon} href="#" />
              <p className="iconText">Diagnostics And Inspections</p>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <b>Common Services</b>
        </Grid.Row>

        <div className="pusher">
          <div className="ui main text container verticalScroll">
            <Label attached="top">Add Services</Label>
            <Segment.Group>
              <Segment attached="top" textAlign="left">
                <p>Oil Change
                  {!props.props.cart.OilChange.selected ? (
                    <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => runServiceQuery('OilChange')} link />
                ) : (
                  <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick('OilChange')} link />
                )}
                </p>
              </Segment>
              {ServiceSegments()}
              <Segment attached="bottom" textAlign="left">
                Smoke or steam is coming out of motorcycle
                {!props.props.cart.SmokeOrSteamIsComingOutOfMotorcycle.selected ? (
                  <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => runServiceQuery('SmokeOrSteamIsComingOutOfMotorcycle')} link />
                ) : (
                  <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick('SmokeOrSteamIsComingOutOfMotorcycle')} link />
                )}
              </Segment>
            </Segment.Group>
          </div>
        </div>


      </Grid>
    </Segment>
  );
}

export default AddServices;
