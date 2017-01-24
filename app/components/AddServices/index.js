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

const activeServices = [];
const disabledServices = ['Air Filter Replacement', 'Brake Pad Replacement', 'Chain And Sprocket Replacement', 'Clean And Lube Chain', 'Prepurchase Inspection', 'Spongy Braking', 'Suspension Tuning', 'Tire Replacement', 'Winterization', 'Accessory Installation', 'Brakes Are Squeaking', 'Check Engine Or FI Light Is On', 'Fluids Are Leaking', 'Motorcycle Is Not Starting', 'Motorcycle Is Overheating', 'NY State Inspection', 'Valve Adjustment', 'Warning Light Is On'];

// TODO: 7/10 create a way to display loading icon during a fetch
// TODO: 6/10 Replace segments with animated list
// TODO: 5/10 Make text in segments responsive
// TODO: 3/10 make search input full width of the screen and responsive

// dispatch response to a reducer that updates the cart state laborTime with the payload
function AddServices(props) {
  // change name of func
  function runPartsQueryAndUpdateLaborTimes(service) {
    console.log(`service added: ${service}`)

    const vehicleSearchTerm = `${props.props.vehicle.year} ${props.props.vehicle.manufacturer} ${props.props.vehicle.model_variant}`
    const midID = props.props.vehicle.mid
    const parsedRepairTimes = JSON.parse(props.props.allRepairTimes.response)

    if(parsedRepairTimes.unavailable){
      console.log(`labortime is unavailable for ${service}`)
      props.props.onQueryLoad(service, 0, true)
      return props.props.onCartClick(service);
    }
      if (service === 'OilChange'){
        // dispatch error message if false
        console.log(parsedRepairTimes)
        const lubrication = parsedRepairTimes[0].sub_groups.filter((sub_group) => {
          return sub_group.sub_group_description === 'Lubrication'
        })
        const oilChangeLaborTime = lubrication[0].components[0].time_hrs
        console.log(`oilchangelabortime: ${oilChangeLaborTime}`)

        props.props.onQueryLoad(service, oilChangeLaborTime)
      }
      var t0 = performance.now()
      props.props.client.query({
        query: gql`
          query searchParts($vehicle: String, $service: String, $midID: String) {
            searchParts(vehicle: $vehicle, service: $service, midID: $midID) {
            response
          }
        }
      `,
        variables: { vehicle: vehicleSearchTerm, service, midID },
        // run onQueryLoad to dispatch setLaborTime action creator
      }).then((result) => {
        console.log(result)
        props.props.onPartsLoad(service, JSON.parse(result.data.searchParts[0].response))
      })
        .then(() => {
          var t1 = performance.now()
          console.log(`parts query took ${(t1-t0)}`)
        });

    // run onCartClick to dispatch addToCart action creator
    return props.props.onCartClick(service);
  }

  // TODO: refactor servicesegments so it first renders active segments and then renders disabled segments
  const activeServiceSegments = () => {
    return activeServices.map((service) => {
      // in case despacing all the services  is required, this is the function needed
      let propifiedService = service.replace(/\s/g, "");
      return (
        <Segment attached textAlign="left" key={service}>
          {service}
          {!props.props.cart[propifiedService].selected ? (
            <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => runPartsQueryAndUpdateLaborTimes(propifiedService)} link />
          ) : (
            <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick(propifiedService)} link />
          )}
        </Segment>
      );
    });
  };

  const disabledServiceSegments = () => {
    return disabledServices.map((service) => {
      // in case despacing all the services  is required, this is the function needed
      let propifiedService = service.replace(/\s/g, "");
      return (
        <Segment attached disabled textAlign="left" key={service}>
          {service}
          {!props.props.cart[propifiedService].selected ? (
            <Icon name="add to cart" disabled size="large" className="serviceIcon blueIcon" />
          ) : (
            <Icon name="trash outline" disabled size="large" className="serviceIcon redIcon" />
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
                    <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => runPartsQueryAndUpdateLaborTimes('OilChange')} link />
                ) : (
                  <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick('OilChange')} link />
                )}
                </p>
              </Segment>
              {activeServiceSegments()}
              {disabledServiceSegments()}
              <Segment attached="bottom" disabled textAlign="left">
                Smoke or steam is coming out of motorcycle
                {!props.props.cart.SmokeOrSteamIsComingOutOfMotorcycle.selected ? (
                  <Icon name="add to cart" size="large" className="serviceIcon blueIcon" />
                ) : (
                  <Icon name="trash outline" size="large" className="serviceIcon redIcon" />
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
