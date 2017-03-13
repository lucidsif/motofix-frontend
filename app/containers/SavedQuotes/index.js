/*
 *
 * SavedQuotes
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectAuthenticated } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { Header, Item, Segment, Accordion, Icon, Dimmer, Loader, Image } from 'semantic-ui-react';
import SavedQuoteBreakDown from 'components/SavedQuoteBreakDown';
import moment from 'moment';

// TODO: Add total, dealer, and savings to each segment
// TODO: Create better styling
const UserIsAuthenticated = UserAuthWrapper({ // eslint-disable-line new-cap
  authSelector: (state) => state.get('global').toJS(),
  predicate: (state) => state.authenticated,
  redirectAction: routerActions.push,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export class SavedQuotes extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderItems() {
    const quotes = this.props.allUserQuotes;
    return quotes.map((quote) => {
      const date = new Date(quote.created_at);
      const formattedDate = moment(date).format('MMMM DD YYYY');
      const motorcycle = JSON.parse(quote.motorcycle_json);
      let location;
      if (motorcycle.location) {
        location = motorcycle.location.customerLocation;
      } else {
        location = 'unavailable';
      }
      // cart and part will both be sent to savedquotebreakdown component
      const cart = JSON.parse(quote.cart_json);
      const part = JSON.parse(quote.part_json);
      const useOwnParts = quote.use_own_parts;
      const voucherCodeStatus = quote.voucher_code_status;

      const selectedServices = Object.keys(cart).filter((key) => cart[key].selected).map((item) => {
        const str = item.replace(/([a-z])([A-Z])/g, '$1 $2');
        return <Item.Description key={str}>{str}</Item.Description>;
      });

      return (
        <Segment key={quote.id}>
          <Item.Content>
            <Item.Header>{motorcycle.year} {motorcycle.manufacturer} {motorcycle.model} ({motorcycle.model_variant})</Item.Header>
            <Item.Meta>{location}</Item.Meta>
            <Item.Meta>{formattedDate}</Item.Meta>
            {selectedServices}
            <Accordion>
              <Accordion.Title>
                <Icon name="dropdown" />
                See Quote Breakdown
              </Accordion.Title>
              <Accordion.Content>
                <SavedQuoteBreakDown cart={cart} part={part} useOwnParts={useOwnParts} voucherCodeStatus={voucherCodeStatus} />
              </Accordion.Content>
            </Accordion>
          </Item.Content>
        </Segment>
      );
    });
  }

  render() {
    const loadingMessage = 'Loading your saved quotes...';
    if (this.props.allUserQuotesLoading) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted content={loadingMessage} />
          </Dimmer>
          <Image src="https://semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      );
    }
    return (
      <div>
        <Segment>
          <Header size="large" textAlign="center"> My Saved Quotes</Header>
          {this.renderItems()}
        </Segment>
      </div>
    );
  }
}

SavedQuotes.propTypes = {
  allUserQuotes: React.PropTypes.array,
  allUserQuotesLoading: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated(),
});

// TODO: do i require any of these fields??
const CurrentUserQuotesQuery = gql`
query allUserQuotes($token: String!){
  allUserQuotes(token: $token){
    id
    fk_user_id
    motorcycle_json
    cart_json
    part_json
    use_own_parts
    voucher_code_status
    created_at
    updated_at
  }
}
`;

const SavedQuotesConnect = connect(mapStateToProps, null);
const withSavedQuotesData = graphql(CurrentUserQuotesQuery, {
  options: {
    variables: { token: localStorage.getItem('authToken') },
    forceFetch: true,
  },
  props: ({ ownProps, data: { loading, allUserQuotes } }) => ({
    allUserQuotesLoading: loading,
    allUserQuotes,
    ownProps,
  }),
});

export default compose(
  SavedQuotesConnect,
  UserIsAuthenticated,
  withSavedQuotesData,
)(SavedQuotes);
