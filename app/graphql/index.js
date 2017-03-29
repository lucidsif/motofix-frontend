import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '//swan.motofix-split-backend.c66.me/graphql',
    opts: {
      credentials: 'same-origin',
      shouldBatch: false,
    },
  }),
  reduxRootSelector: (state) => state.get('apollo'),
});

export default client;

export const apolloReducer = client.reducer();
