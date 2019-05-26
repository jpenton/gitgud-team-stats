import { IResolverObject } from 'graphql-tools';
import { IContext } from '../types';
import axios from 'axios';
import cheerio from 'cheerio';

const Team: IResolverObject<any, IContext> = {
  players: ({ id }, _, { prisma }) => {
    return prisma
      .team({
        id,
      })
      .players();
  },
  rank: async ({ id }, _, { prisma }) => {
    const players = await prisma
      .team({
        id,
      })
      .players();

    const ranks = [];
    for (let i = 0; i < players.length; i++) {
      const url =
        'https://playoverwatch.com/en-us/career/pc/' +
        encodeURIComponent(players[i].bnet.replace('#', '-'));
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const rank = $(
        'div.masthead-player-progression:nth-child(3) > div:nth-child(3) > div:nth-child(2)',
      ).text();
      const nRank = parseInt(rank, 10);

      if (!Number.isNaN(nRank)) {
        ranks.push(nRank);
      }
    }

    const averageRanks = ranks.reduce((prev, curr) => prev + curr, 0);

    return Math.floor(averageRanks / ranks.length);
  },
};

export default Team;
