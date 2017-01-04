/**
*
* ServiceCentral
*
*/

import React from 'react';
import { Grid, Segment, Input, Icon, Image } from 'semantic-ui-react';
import toolIcon from './toolIcon.png';
import diagnoseIcon from './diagnoseIcon.png';


function ServiceCentral() {
  return (
    <Segment padded="very">
      <Grid centered>
        <Grid.Row>
          <Input icon="search" placeholder="Search services" />
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment textAlign="center">
              <Image centered src={toolIcon} />
              <p className="iconText"> Repairs & Maintenance</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
          <Segment textAlign="center">
            <Image centered src={diagnoseIcon} />
            <p className="iconText">Diagnostics & Inspections</p>
          </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          Common Services
        </Grid.Row>


        <Grid.Row>
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
          <Segment attached="bottom" textAlign="left">
            Oil Change
            <Icon name="add to cart" size="large" className="serviceIcon blueIcon" link />
            <Icon name="trash outline" size="large" className="serviceIcon redIcon" link />
          </Segment>
        </Grid.Row>


      </Grid>
    </Segment>
  );
}

export default ServiceCentral;
