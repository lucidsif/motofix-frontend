/**
*
* AddServices
*
*/

import React from 'react';
import { Grid, Segment, Input, Icon, Image, Label } from 'semantic-ui-react';
// noinspection JSUnresolvedVariable
import toolIcon from './toolIcon.png';
// noinspection JSUnresolvedVariable
import diagnoseIcon from './diagnoseIcon.png';
import gql from 'graphql-tag';
import CustomQuoteFormModal from 'components/CustomQuoteFormModal';
const activeServices = ['Pre-purchase Inspection'];
const disabledServices = ['Air Filter Replacement', 'Brake Pad Replacement', 'Chain And Sprocket Replacement', 'Clean And Lube Chain', 'Spongy Braking', 'Suspension Tuning', 'Tire Replacement', 'Winterization', 'Accessory Installation', 'Brakes Are Squeaking', 'Check Engine Or FI Light Is On', 'Fluids Are Leaking', 'Motorcycle Is Not Starting', 'Motorcycle Is Overheating', 'NY State Inspection', 'Valve Adjustment', 'Warning Light Is On'];

// TODO: 6/10 Replace segments with animated list
// TODO: 5/10 Make text in segments responsive
// TODO: 3/10 make search input full width of the screen and responsive

function AddServices(props) {
  // TODO: change name of func
  function runPartsQueryAndUpdateLaborTimes(service) {
    const vehicleSearchTerm = `${props.props.vehicle.year} ${props.props.vehicle.manufacturer} ${props.props.vehicle.model_variant}`;
    const midID = props.props.vehicle.mid;
    const parsedRepairTimes = JSON.parse(props.props.allRepairTimes.response);
    // TODO: refactor to switch statements. if unavailable, run a switch, else run a different switch
    // TODO: if repairtimes are unavailable, run switch statements for each service case and update the labortime to an expected price
    // with an expected labortime
    if (parsedRepairTimes.unavailable) {
      switch (service) {
        case 'Pre-purchaseInspection':
          props.props.onCartClick(service);
          return props.props.getAndSetLaborTime(service, 0.55);
        case 'OilChange':
          props.props.getAndSetLaborTime(service, 0.35, true);
          props.props.onCartClick(service);
          return runSearchPartsQuery();
        default:
          console.log('unknown unavailable(unavailable!) service in runpartsqueryandupdatelabortimes');
      }
    }
// if labortimes is available
    switch (service) {
      case 'Pre-purchaseInspection':
        props.props.onCartClick(service);
        return props.props.getAndSetLaborTime(service, 0.55);
      case 'OilChange': // eslint-disable-line no-case-declarations
        const lubrication = parsedRepairTimes[0].sub_groups.filter((subGroup) => subGroup.sub_group_description === 'Lubrication');
        // noinspection JSUnresolvedVariable
        const oilChangeLaborTime = lubrication[0].components[0].time_hrs;
        props.props.getAndSetLaborTime(service, oilChangeLaborTime);
        break;
      default:
        console.log('unknown available service in runpartsqueryandupdatelabortimes');
    }

      // noinspection JSUnresolvedVariable
    const t0 = performance.now();
    runSearchPartsQuery();
    return props.props.onCartClick(service);

    function runSearchPartsQuery() {
      props.props.client.query({
        query: gql`
          query searchParts($vehicle: String!, $service: String!, $midID: String!) {
            searchParts(vehicle: $vehicle, service: $service, midID: $midID) {
            response
          }
        }
      `,
        variables: { vehicle: vehicleSearchTerm, service, midID },
      }).then((result) => {
        console.log(result);
        // noinspection JSUnresolvedVariable
        props.props.onPartsQuery(service, JSON.parse(result.data.searchParts[0].response));
        // noinspection JSUnresolvedVariable
        const t1 = performance.now();
        console.log(`parts query took ${(t1 - t0)}`);
      })
        .catch((e) => {
          const err = e;
          if (err.statusCode === 403) {
            console.log(' query error, pop fail parts query message');
          }
          logException(err);
        });
    }
  }

  function logException(ex, context) {
    Raven.captureException(ex, { // eslint-disable-line no-undef
      extra: context,
    });
    /* eslint no-console:0*/
    window.console && console.error && console.error(ex); // eslint-disable-line no-unused-expressions
  }

  function handleSegmentClick(serviceName) {
    if (!props.props.cart[serviceName].selected) {
      return runPartsQueryAndUpdateLaborTimes(serviceName);
    }
    return props.props.onTrashClick(serviceName);
  }

  // TODO: refactor ServiceSegments so it first renders active segments and then renders disabled segments
  const activeServiceSegments = () => activeServices.map((service) => {
      /* in case despacing all the services  is required, this is the function needed*/
    const deSpacedService = service.replace(/\s/g, '');
    return (
      <Segment attached textAlign="left" key={service} onClick={() => handleSegmentClick(deSpacedService)}>
        {service}
        {!props.props.cart[deSpacedService].selected ? (
          <Icon name="add to cart" size="large" className="serviceIcon blueIcon" onClick={() => runPartsQueryAndUpdateLaborTimes(deSpacedService)} link />
          ) : (
            <Icon name="trash outline" size="large" className="serviceIcon redIcon" onClick={() => props.props.onTrashClick(deSpacedService)} link />
          )}
      </Segment>
    );
  });

  const disabledServiceSegments = () => disabledServices.map((service) => {
      // in case despacing all the services  is required, this is the function needed
    const deSpacedService = service.replace(/\s/g, '');
    return (
      <Segment attached disabled textAlign="left" key={service}>
        {service}
        {!props.props.cart[deSpacedService].selected ? (
          <Icon name="add to cart" disabled size="large" className="serviceIcon blueIcon" />
          ) : (
            <Icon name="trash outline" disabled size="large" className="serviceIcon redIcon" />
          )}
      </Segment>
    );
  });

  return (
    <Segment padded="very">
      <Grid centered>
        <Grid.Row>
          <Input disabled className="serviceSearchWidth" icon="search" placeholder="Search services" />
        </Grid.Row>


        <Grid.Row>
          <CustomQuoteFormModal vehicle={props.props.vehicle} client={props.props.client} />
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment disabled textAlign="center">
              <Image as="a" centered size="mini" src={toolIcon} />
              <p className="iconText"> Repairs And Maintenance</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment disabled textAlign="center">
              <Image as="a" centered size="mini" src={diagnoseIcon} />
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
              <Segment attached="top" textAlign="left" onClick={() => handleSegmentClick('OilChange')}>
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
                  <Icon disabled name="add to cart" size="large" className="serviceIcon blueIcon" />
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

// noinspection JSUnresolvedVariable
AddServices.propTypes = {
  props: React.PropTypes.object,
};

export default AddServices;
