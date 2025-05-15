import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/schema';
import { resolvers } from './resolver/resolver';

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
