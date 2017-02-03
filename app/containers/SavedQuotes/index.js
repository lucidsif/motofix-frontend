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
      const date = new Date(quote.createdAt);
      const formattedDate = date.toString();
      const motorcycle = JSON.parse(quote.motorcycle_json);
      // cart and part will both be sent to savedquotebreakdown component
      const cart = JSON.parse(quote.cart_json);
      const part = JSON.parse(quote.part_json);

      const selectedServices = Object.keys(cart).filter((key) => cart[key].selected).map((item) => {
        const str = item.replace(/([a-z])([A-Z])/g, '$1 $2');
        return <Item.Description key={str}>{str}</Item.Description>;
      });

      return (
        <Segment key={formattedDate}>
          <Item.Content>
            <Item.Header>{motorcycle.year} {motorcycle.manufacturer} {motorcycle.model} ({motorcycle.model_variant})</Item.Header>
            <Item.Meta>{formattedDate}</Item.Meta>
            {selectedServices}
            <Accordion>
              <Accordion.Title>
                <Icon name="dropdown" />
                See Quote Breakdown
              </Accordion.Title>
              <Accordion.Content>
                <SavedQuoteBreakDown cart={cart} part={part} />
              </Accordion.Content>
            </Accordion>
          </Item.Content>
        </Segment>
      );
    });
  }

  render() {
    console.log(this.props);
    const loadingMessage = 'Loading your saved quotes...';
    if (this.props.allUserQuotesLoading) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted content={loadingMessage} />
          </Dimmer>
          <Image src="http://semantic-ui.com/images/wireframe/short-paragraph.png" />
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

const CurrentUserQuotesQuery = gql`
query allUserQuotes($token: String){
  allUserQuotes(token: $token){
    id
    fk_users_id
    motorcycle_json
    cart_json
    part_json
    createdAt
    updatedAt
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