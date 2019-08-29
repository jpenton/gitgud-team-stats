export interface PageProps {
  pathname: string;
  query: Partial<Record<string, string>>;
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
  division: string;
  losses: number | null;
  name: string;
  players: IPlayer[] | null;
  pointDifference: number | null;
  setWins: number | null;
  slug: string;
  tieBreakersWon: number | null;
  ties: number | null;
  updatedAt: string;
  wins: number | null;
}
