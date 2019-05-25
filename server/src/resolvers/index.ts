import { IResolvers } from 'graphql-tools';
import Query from './Query';
import Team from './Team';

const resolvers: IResolvers = {
  Query,
  Team,
};

export default resolvers;
