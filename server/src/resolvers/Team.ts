import { IResolverObject } from 'graphql-tools';
import { IContext } from '../types';

const Team: IResolverObject<any, IContext> = {
  players: ({ id }, _, { prisma }) => {
    return prisma
      .team({
        id,
      })
      .players();
  },
};

export default Team;
