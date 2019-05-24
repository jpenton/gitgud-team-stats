import { IResolverObject } from 'graphql-tools';
import { IContext } from '../types';

const Query: IResolverObject<any, IContext> = {
  player: (_, { id }, { prisma }) => {
    return prisma.player({
      id,
    });
  },
};

export default Query;
