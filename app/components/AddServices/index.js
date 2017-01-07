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

// TODO: 5/10 Make text in segments responsive
// TODO: 3/10 make search input full width of the screen and responsive

function AddServices(props) {
  const { onCartClick, onTrashClick, cart, oilChange, winterization } = props;

  const ServiceSegments = () => {
    return services.map((service) => {
      return (
        <Segment attached textAlign="left" key={service}>
          {service}
          {!cart[service].selected ? (
            <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => onCartClick(service)} link />
          ) : (
            <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => onTrashClick(service)} link />
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
                  {!cart['Oil Change'].selected ? (
                    <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => onCartClick('Oil Change', oilChange)} link />
                ) : (
                  <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => onTrashClick('Oil Change')} link />
                )}
                </p>
              </Segment>
              {ServiceSegments()}
              <Segment attached="bottom" textAlign="left">
                Smoke or steam is coming out of motorcycle
                {!cart['Smoke or steam is coming out of motorcycle'].selected ? (
                  <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => onCartClick('Smoke or steam is coming out of motorcycle')} link />
                ) : (
                  <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => onTrashClick('Smoke or steam is coming out of motorcycle')} link />
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
