import { IResolverObject } from 'graphql-tools';
import { IContext } from '../types';

const Query: IResolverObject<any, IContext> = {
  player: (_, { id }, { prisma }) => {
    return prisma.player({
      id,
    });
  },
  team: (_, { id, slug }, { prisma }) => {
    return prisma.team({
      id,
      slug,
    });
  },
  teams: (_, { division, region }, { prisma }) => {
    return prisma.teams({
      where: {
        division,
        region,
      },
    });
  },
};

export default Query;
