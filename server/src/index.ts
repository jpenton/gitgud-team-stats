import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';
import { prisma } from '../generated/prisma-client';
import parseTeams from './lib/parseTeams';
import ms from 'ms';

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
    // parseTeams(prisma);
    // setInterval(parseTeams, ms('3h'), prisma);
  },
);
