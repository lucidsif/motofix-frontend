import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://162.243.173.35/graphql',
    opts: {
      credentials: 'same-origin',
      shouldBatch: false,
    },
  }),
  reduxRootSelector: (state) => state.get('apollo'),
});

export default client;

export const apolloReducer = client.reducer();
