import ADVANCED from './ADVANCED.json';
import BEGINNER from './BEGINNER.json';
import EXPERT from './EXPERT.json';
import INTERMEDIATE from './INTERMEDIATE.json';
import ROOKIE from './ROOKIE.json';
import { ITeam } from '../types/index.js';

const divisionTeams: { [key: string]: ITeam[] } = {
  ADVANCED,
  BEGINNER,
  EXPERT,
  INTERMEDIATE,
  ROOKIE,
};

export const teamsMap: { [key: string]: ITeam | undefined } = {};

for (const teams of Object.values(divisionTeams)) {
  for (const team of teams) {
    teamsMap[team.slug] = team;
  }
}

export default divisionTeams;
