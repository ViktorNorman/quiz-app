const { ApolloServer, PubSub } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({ typeDefs, resolvers, context: (({req,res}) => ({req,res, pubsub})) });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });