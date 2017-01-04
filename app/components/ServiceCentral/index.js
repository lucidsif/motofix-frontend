/**
*
* ServiceCentral
*
*/

import React from 'react';
import { Grid, Segment, Input } from 'semantic-ui-react';


function ServiceCentral() {
  return (
    <Segment padded="very">
      <Grid.Row>
        <Input icon="search" placeholder='Search services' />
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
        <p>Services</p>
      </Grid.Row>
    </Segment>
  );
}

export default ServiceCentral;
