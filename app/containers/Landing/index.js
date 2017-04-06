/*
 *
 * Landing
 *
 */
import React from 'react';
import { Link } from 'react-router';
import { withApollo } from 'react-apollo';
import RedditCarousel from 'components/RedditCarousel';
import FormModal from 'components/FormModal';
import { Image, Table, Grid, Menu, Segment, Label, Step } from 'semantic-ui-react';
import mechanicIcon from './mechanic.png';
import piggyBank from './piggy-bank.png';
import controller from './controller.png';


// TODO: Create successful signup mutation message
export class Landing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = { activeItem: 'NY' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    return (
      <div className="pusher">
        <div className="ui inverted vertical masthead center aligned segment landing-image">
          <h2>
            Tired Of Motorcycle Repair Shops?
          </h2>
          <h1>
            OUR MOTORCYCLE MECHANICS COME TO YOU
          </h1>
          <h3>
            Fair Pricing Backed With A 5,000 mi/6 Month Warranty
          </h3>
          <Link
            className="ui orange huge circular button"
            to="/quote/vehicle"
          >
            Get Instant Quote
          </Link>
        </div>

        <div className="ui vertical stripe segment padSegment">
          <div className="ui middle aligned stackable grid container">
            <div className="center aligned row">
              <div className="column">
                <h2 className="soft-gray-h2">
                  What Are Riders Saying About Us?
                </h2>
              </div>
            </div>
            <div className="center aligned row">
              <div className="column">
                <RedditCarousel />
              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe quote segment">
          <div className="ui equal width stackable internally celled grid">

            <div className="center aligned row">
              <div className="column">
                <h2 className="soft-gray-h2">
                  Honest, Professional Mechanics
                </h2>
                <p>Services are perfomed by the most qualified motorcycle mechanics we handpicked for the job.
                  <br />
                  <br />
                  By booking with motofix, you'll even get our exclusive 5,000 mile/6 month warranty
                </p>
                <Image size="tiny" src={mechanicIcon} centered />
              </div>
              <div className="column">
                <h2 className="soft-gray-h2">
                  Save Money
                </h2>
                <p>We aim for fair, transparent pricing. Our pricing may be up to 30% lower than your local dealership. </p>
                <Image size="tiny" src={piggyBank} centered />
              </div>
            </div>
            <div className="center aligned row">
              <div className="column">
                <h2 className="soft-gray-h2">
                  Convenience & Ease
                </h2>
                <p>Skip the motorcycle repair shop and get instant, free quotes on your phone or on your computer, anytime. <br />
                  <br />
                  No more quote shopping, taxis, rushing after work, or any of the typical hassles associated with trying to schedule a service for your motorcycle. <br />
                  <br />
                  Now you can use the extra time and cognitive resources to do more important things, like videogames. <br />
                </p>
                <Image size="tiny" src={controller} centered />
              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe segment padSegment">
          <div className="ui middle aligned stackable grid container">
            <div className="center aligned row">
              <div className="column">
                <h2 className="soft-gray-h2">
                  Motorcycle Repair Services We Offer
                </h2>

                <Table fixed>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Engine</Table.HeaderCell>
                      <Table.HeaderCell>Brakes</Table.HeaderCell>
                      <Table.HeaderCell>Tires/Wheels</Table.HeaderCell>
                      <Table.HeaderCell>Chain Drive</Table.HeaderCell>
                      <Table.HeaderCell>Inspections/Diagnostics</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Change Oil & Filter</Table.Cell>
                      <Table.Cell>Brake Pad Replacement</Table.Cell>
                      <Table.Cell>Replace Tires</Table.Cell>
                      <Table.Cell>Clean & Lube Chain</Table.Cell>
                      <Table.Cell>Pre-purchase Inspection</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Spark Plug Replacement</Table.Cell>
                      <Table.Cell>Brake Rotor Replacement</Table.Cell>
                      <Table.Cell>Replace Wheels</Table.Cell>
                      <Table.Cell>Replace Chain & Sprockets</Table.Cell>
                      <Table.Cell>Motorcycle Is Not Starting</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Clean Carburetors</Table.Cell>
                      <Table.Cell>Bleed Brakes</Table.Cell>
                      <Table.Cell>Measure Tire Pressure & Fill Tires</Table.Cell>
                      <Table.Cell>Replace Belt Drive</Table.Cell>
                      <Table.Cell>Diagnose Engine Codes</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>Fix/Replace Radiator</Table.Cell>
                      <Table.Cell>Squeaky Brakes</Table.Cell>
                      <Table.Cell>Custom Lighting Installation for Wheels</Table.Cell>
                      <Table.Cell>Custom Sprockets</Table.Cell>
                      <Table.Cell>State Inspection</Table.Cell>
                    </Table.Row>
                  </Table.Body>

                </Table>

              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe segment padSegment">
          <div className="ui middle aligned stackable grid container">
            <div className="center aligned row">
              <div className="column">
                <h2 className="soft-gray-h2">
                  We Can Service Your Motorcycle
                </h2>
                <Grid relaxed centered>

                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://upload.wikimedia.org/wikipedia/commons/6/66/Ducati_red_logo.PNG" />
                  </Grid.Column>
                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Harley_Davidson_logo.gif" />
                  </Grid.Column >
                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Logo_Indian_no_oficial.svg" />
                  </Grid.Column>
                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://i.ebayimg.com/images/i/321943265030-0-1/s-l1000.jpg" />
                  </Grid.Column>
                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Aprilia-logo.svg" />
                  </Grid.Column>

                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://www.irononsticker.com/images/Honda3.jpg" />
                  </Grid.Column>
                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://ae01.alicdn.com/kf/HTB1HMRzNVXXXXc2aXXXq6xXFXXXO/Car-Styling-font-b-Kawasaki-b-font-font-b-Logo-b-font-Ninja-ZX-R-font.jpg" />
                  </Grid.Column>
                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://c2.staticflickr.com/6/5552/14671839137_9890286517_b.jpg" />
                  </Grid.Column>
                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://img.clipartfox.com/39f929d0c6563f2817fe9b7da43992eb_ktm-racing-motorcycle-logo-ktm-logo-hd-clipart_700-700.jpeg" />
                  </Grid.Column>
                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://www.seeklogo.net/wp-content/uploads/2013/05/suzuki-eps-vector-logo-400x400.png" />
                  </Grid.Column>
                  <Grid.Column mobile={8} tablet={4} computer={3}>
                    <Image size="tiny" src="https://upload.wikimedia.org/wikipedia/en/0/08/The_company_logo_for_Victory_Motorcycles.png" />
                  </Grid.Column>

                </Grid>
              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe segment padSegment">
          <div className="ui middle aligned stackable grid container">
            <div className="center aligned row">
              <div className="column">
                <h2 className="soft-gray-h2">
                  Our Mobile Motorcyle Mechanic Coverage
                </h2>
                <Grid>
                  <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                      <Menu.Item name="NY" active={activeItem === 'NY'} onClick={this.handleItemClick} />
                      <Menu.Item name="CA" active={activeItem === 'CA'} onClick={this.handleItemClick} />
                    </Menu>
                  </Grid.Column>

                  <Grid.Column stretched width={12} stackable>
                    {
                      activeItem === 'NY' &&
                      <Segment>
                        <Label>
                          Queens
                        </Label>
                        <Label>
                          Brooklyn
                        </Label>
                        <Label>
                          Manhattan
                        </Label>
                        <Label>
                          Bronx
                        </Label>
                      </Segment>
                    }
                    {
                      activeItem === 'CA' &&
                      <Segment>
                        <Label>
                          Los Angelos
                        </Label>
                        <Label>
                          Long Beach
                        </Label>
                      </Segment>
                    }

                  </Grid.Column>
                </Grid>

              </div>
            </div>
          </div>
        </div>

        <div className="ui vertical stripe segment padSegment">
          <div className="ui middle aligned stackable grid container">
            <div className="center aligned row">
              <div className="column">
                <h2 className="soft-gray-h2">
                  How It Works
                </h2>
              </div>
            </div>

            <div className="center aligned row">
              <div className="column">
                <Step.Group vertical>
                  <Step icon="teal quote right" title="1. Get Instant Quote" description="Select your motorcycle and add services to cart." />
                  <Step icon="yellow calendar check" title="2. Schedule Appointment" description="Select an available time slot from the calendar." />
                  <Step icon="blue wrench" title="3. Get Motorcycle Fixed" description="Your mobile mechanic repairs your motorcycle." />
                  <Step icon="green payment" title="4. Payment Is Released" description="The payment is released after your satisfaction." />
                </Step.Group>
              </div>
            </div>

            <h4 className="ui horizontal header divider">
              Well, what are you waiting for?
            </h4>
            <p>{"We believe you'll love us so much that we're giving you $15 off your next service if you sign up during this beta period."}</p>
            <div className="center aligned row">
              <FormModal client={this.props.client} />
            </div>
          </div>
        </div>


      </div>
    );
  }
}

Landing.propTypes = {
  client: React.PropTypes.object,
};

const LandingWithApollo = withApollo(Landing);

export default LandingWithApollo;
