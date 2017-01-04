/**
*
* ServiceCentral
*
*/

import React from 'react';
import { Grid, Segment, Input, Icon, Image } from 'semantic-ui-react';
import toolIcon from './toolIcon.png';
import diagnoseIcon from './diagnoseIcon.png';

const services = ['NY State Inspection', 'Motorcycle is not starting (Inspection)', 'Pre-purchase Inspection', 'Winterization', 'Air Filter Replacement', 'Chain & Sprocket Replacement', 'Clean & Lube Chain', 'Valve Adjustment', 'Accessory Installation', 'Suspension Tuning', 'Tire Replacement', 'Brake Pad Replacement', 'Check engine/FI light in on', 'Warning light is on', 'Fluids are leaking', 'Motorcycle is overheating', 'Brakes are squeaking', 'Spongy braking'];

const serviceSegments = () => {
  return services.map((service) => {
    return (
      <Segment attached textAlign="left">
        {service}
        <Icon name="add to cart" size="large" className="serviceIcon blueIcon" link />
        <Icon name="trash outline" size="large" className="serviceIcon redIcon"link />
      </Segment>
    );
  });
};

// TODO: 3/10 make search input full width of the screen and responsive

function ServiceCentral() {
  return (
    <Segment padded="very">
      <Grid centered>
        <h4> Add Services </h4>
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
          Common Services
        </Grid.Row>

        <div className="pusher">
          <div className="ui main text container verticalScroll">
          <Segment.Group>
          <Segment attached="top" textAlign="left">
            <p>Oil Change
              <Icon name="add to cart" size="large" className="serviceIcon blueIcon" link />
              <Icon name="trash outline" size="large" className="serviceIcon redIcon" link />
            </p>
          </Segment>
          <Segment attached textAlign="left">
            Replace brake pads
            <Icon name="add to cart" size="large" className="serviceIcon blueIcon" link />
            <Icon name="trash outline" size="large" className="serviceIcon redIcon"link />
          </Segment>
            {serviceSegments()}
          <Segment attached="bottom" textAlign="left">
            Smoke or steam is coming out of motorcycle
            <Icon name="add to cart" size="large" className="serviceIcon blueIcon" link />
            <Icon name="trash outline" size="large" className="serviceIcon redIcon" link />
          </Segment>
          </Segment.Group>
          </div>
        </div>


      </Grid>
    </Segment>
  );
}

export default ServiceCentral;
