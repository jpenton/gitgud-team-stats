export interface PageProps {
  pathname: string;
}

export interface IPlayer {
  id: string;
  bnet: string;
  discord: string;
  role: Role;
  sr: number | null;
}

export type Role =
  | 'MAIN_TANK'
  | 'OFF_TANK'
  | 'HITSCAN_DPS'
  | 'PROJECTILE_DPS'
  | 'MAIN_SUPPORT'
  | 'FLEX_SUPPORT'
  | 'SUB'
  | 'PLAYER';

export interface ITeam {
  id: string;
  losses?: number;
  name: string;
  players: IPlayer[] | null;
  pointDifference?: number;
  setWins?: number;
  slug: string;
  tieBreakersWon?: number;
  ties?: number;
  updatedAt: string;
  wins?: number;
}
