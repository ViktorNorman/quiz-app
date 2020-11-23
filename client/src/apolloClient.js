// import ApolloClient, {
//   createNetworkInterface,
//   addTypeName,
// } from 'apollo-client';
// const client = new ApolloClient({
//   networkInterface: createNetworkInterface('http://0.0.0.0:1338/api'),
//   queryTransformer: addTypeName,
// });

import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const link = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default client;
