import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';
import { prisma } from '../generated/prisma-client';

const PORT = process.env.PORT || 8000;

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma,
  },
});
server.start(
  {
    port: PORT,
  },
  () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  },
);
