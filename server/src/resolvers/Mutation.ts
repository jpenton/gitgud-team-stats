import { IResolverObject } from 'graphql-tools';
import { IContext } from '../types';

const Mutation: IResolverObject<any, IContext> = {
  createPlayer: (_, { bnet, discord, role }, { prisma }) => {
    return prisma.createPlayer({
      bnet,
      discord,
      role,
    });
  },
};

export default Mutation;
