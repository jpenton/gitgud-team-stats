import { IResolvers } from 'graphql-tools';
import Mutation from './Mutation';
import Query from './Query';
import Team from './Team';

const resolvers: IResolvers = {
  Query,
  Mutation,
  Team,
};

export default resolvers;
