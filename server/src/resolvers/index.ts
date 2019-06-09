import { IResolvers } from 'graphql-tools';
import Player from './Player';
import Query from './Query';
import Team from './Team';

const resolvers: IResolvers = {
  Player,
  Query,
  Team,
};

export default resolvers;
