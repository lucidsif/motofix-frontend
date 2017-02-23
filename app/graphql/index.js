import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '//drake.motofix-shared-backend.c66.me/graph',
    opts: {
      credentials: 'same-origin',
      shouldBatch: false,
    },
  }),
  reduxRootSelector: (state) => state.get('apollo'),
});

export default client;

export const apolloReducer = client.reducer();
