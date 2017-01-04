/**
*
* ServiceCentral
*
*/

import React from 'react';
import { Grid, Segment, Input, Icon } from 'semantic-ui-react';


function ServiceCentral() {
  return (
    <Segment padded="very">
      <Grid centered>
        <Grid.Row>
          <Input icon="search" placeholder="Search services" />
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            Repairs & Maintenance
          </Grid.Column>
          <Grid.Column>
            Diagnostics & Inspections
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          Common Services
        </Grid.Row>


        <Grid.Row>
          <Segment attached="top" textAlign="left">
            <p>Oil Change
              <Icon name="add to cart" size="large" />
            </p>
          </Segment>
          <Segment attached textAlign="left">
            Replace brake pads
          </Segment>
          <Segment attached="bottom" textAlign="left">
            Oil Change
          </Segment>
        </Grid.Row>


      </Grid>
    </Segment>
  );
}

export default ServiceCentral;
