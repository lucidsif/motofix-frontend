/**
*
* AddServices
*
*/

import React from 'react';
import { Grid, Segment, Input, Icon, Image, Label } from 'semantic-ui-react';
import toolIcon from './toolIcon.png';
import diagnoseIcon from './diagnoseIcon.png';

const services = ['Accessory Installation', 'Air Filter Replacement', 'Brake Pad Replacement', 'Brakes Are Squeaking', 'Chain And Sprocket Replacement', 'Check Engine Or FI Light Is On', 'Clean And Lube Chain', 'Fluids Are Leaking', 'Motorcycle Is Not Starting', 'Motorcycle Is Overheating', 'NY State Inspection', 'Prepurchase Inspection', 'Spongy Braking', 'Suspension Tuning', 'Tire Replacement', 'Valve Adjustment', 'Warning Light Is On', 'Winterization'];

// Pre-req to adding passing dynamic props to service segments is writing out all the queries
// TODO: 8/10 add all services
// TODO: 5/10 Make text in segments responsive
// TODO: 3/10 make search input full width of the screen and responsive

function AddServices(props) {
  // const { props: { props.onCartClick, props.onTrashClick, cart, OilChange, Winterization }} = props;

  // .replace(/\s/g,'')
  const ServiceSegments = () => {
    return services.map((service) => {
      // in case despacing all the services  is required, this is the function needed
      let propifiedService = service.replace(/\s/g, "")
      return (
        <Segment attached textAlign="left" key={service}>
          {service}
          {!props.props.cart[propifiedService] ? (
            <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => props.props.onCartClick(propifiedService)} link />
          ) : (
            <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick(propifiedService)} link />
          )}
        </Segment>
      );
    });
  };
  // checking for props.data.refetch()
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
                  {!props.props.cart.OilChange ? (
                    <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => props.props.onCartClick('OilChange')} link />
                ) : (
                  <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick('OilChange')} link />
                )}
                </p>
              </Segment>
              {ServiceSegments()}
              <Segment attached="bottom" textAlign="left">
                Smoke or steam is coming out of motorcycle
                {!props.props.cart.SmokeOrSteamIsComingOutOfMotorcycle ? (
                  <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => props.props.onCartClick('SmokeOrSteamIsComingOutOfMotorcycle')} link />
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
