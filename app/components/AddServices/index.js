/**
*
* AddServices
*
*/

import React from 'react';
import { Grid, Segment, Input, Icon, Image, Label } from 'semantic-ui-react';
import toolIcon from './toolIcon.png';
import diagnoseIcon from './diagnoseIcon.png';

const services = ['NY State Inspection', 'Motorcycle is not starting (Inspection)', 'Pre-purchase Inspection', 'Winterization', 'Air Filter Replacement', 'Chain & Sprocket Replacement', 'Clean & Lube Chain', 'Valve Adjustment', 'Accessory Installation', 'Suspension Tuning', 'Tire Replacement', 'Brake Pad Replacement', 'Check engine/FI light in on', 'Warning light is on', 'Fluids are leaking', 'Motorcycle is overheating', 'Brakes are squeaking', 'Spongy braking'];

// Pre-req to adding passing dynamic props to service segments is writing out all the queries
// TODO: 8/10 add all services
// TODO: 5/10 Make text in segments responsive
// TODO: 3/10 make search input full width of the screen and responsive

function AddServices(props) {
  // const { props: { props.onCartClick, props.onTrashClick, cart, OilChange, Winterization }} = props;

  // .replace(/\s/g,'')
  const ServiceSegments = () => {
    return services.map((service) => {
      const propifiedService = service.replace(/\s/g,'').replace(/['"]+/g, '');
      return (
        <Segment attached textAlign="left" key={service}>
          {service}
          {!props.props.cart[service].selected ? (
            <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => props.props.onCartClick(service, props.props[service])} link />
          ) : (
            <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick(service)} link />
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
              <p className="iconText"> Repairs & Maintenance</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment textAlign="center">
              <Image as="a" centered size="mini" src={diagnoseIcon} href="#" />
              <p className="iconText">Diagnostics & Inspections</p>
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
                  {!props.props.cart['Oil Change'].selected ? (
                    <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => props.props.onCartClick('Oil Change', props.props.OilChange)} link />
                ) : (
                  <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick('Oil Change')} link />
                )}
                </p>
              </Segment>
              {ServiceSegments()}
              <Segment attached="bottom" textAlign="left">
                Smoke or steam is coming out of motorcycle
                {!props.props.cart['Smoke or steam is coming out of motorcycle'].selected ? (
                  <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => props.props.onCartClick('Smoke or steam is coming out of motorcycle')} link />
                ) : (
                  <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick('Smoke or steam is coming out of motorcycle')} link />
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
