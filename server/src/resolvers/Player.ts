import { IResolverObject } from 'graphql-tools';
import { IContext } from '../types';

const Player: IResolverObject<any, IContext> = {
  team: ({ id }, _, { prisma }) => {
    return prisma
      .player({
        id,
      })
      .team();
  },
};

export default Player;
