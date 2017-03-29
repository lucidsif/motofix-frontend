import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '//flamingo.motofix-shared-backend-test.c66.me/',
    opts: {
      credentials: 'same-origin',
      shouldBatch: false,
    },
  }),
  reduxRootSelector: (state) => state.get('apollo'),
});

export default client;

export const apolloReducer = client.reducer();
