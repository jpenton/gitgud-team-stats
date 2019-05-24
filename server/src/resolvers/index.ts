import { IResolvers } from 'graphql-tools';
import Mutation from './Mutation';
import Query from './Query';

const resolvers: IResolvers = {
  Query,
  Mutation,
};

export default resolvers;
