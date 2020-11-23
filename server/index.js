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
