const { ApolloServer } = require('apollo-server');
const { RedisPubSub } = require('graphql-redis-subscriptions');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const pubsub = new RedisPubSub();

// const pubsub = new PubSub();

const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// import { RedisPubSub } from 'graphql-redis-subscriptions';
// import * as Redis from 'ioredis';

// const options = {
//   host: REDIS_DOMAIN_NAME,
//   port: PORT_NUMBER,
//   retryStrategy: times => {
//     // reconnect after
//     return Math.min(times * 50, 2000);
//   }
// };

// const pubsub = new RedisPubSub({
//   ...,
//   publisher: new Redis(options),
//   subscriber: new Redis(options)
// });
