// Code generated by Prisma (prisma@1.34.0). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from 'graphql';
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model,
} from 'prisma-client-lib';
import { typeDefs } from './prisma-schema';

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  player: (where?: PlayerWhereInput) => Promise<boolean>;
  team: (where?: TeamWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any },
  ) => Promise<T>;

  /**
   * Queries
   */

  player: (where: PlayerWhereUniqueInput) => PlayerNullablePromise;
  players: (args?: {
    where?: PlayerWhereInput;
    orderBy?: PlayerOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Player>;
  playersConnection: (args?: {
    where?: PlayerWhereInput;
    orderBy?: PlayerOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => PlayerConnectionPromise;
  team: (where: TeamWhereUniqueInput) => TeamNullablePromise;
  teams: (args?: {
    where?: TeamWhereInput;
    orderBy?: TeamOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Team>;
  teamsConnection: (args?: {
    where?: TeamWhereInput;
    orderBy?: TeamOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => TeamConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createPlayer: (data: PlayerCreateInput) => PlayerPromise;
  updatePlayer: (args: {
    data: PlayerUpdateInput;
    where: PlayerWhereUniqueInput;
  }) => PlayerPromise;
  updateManyPlayers: (args: {
    data: PlayerUpdateManyMutationInput;
    where?: PlayerWhereInput;
  }) => BatchPayloadPromise;
  upsertPlayer: (args: {
    where: PlayerWhereUniqueInput;
    create: PlayerCreateInput;
    update: PlayerUpdateInput;
  }) => PlayerPromise;
  deletePlayer: (where: PlayerWhereUniqueInput) => PlayerPromise;
  deleteManyPlayers: (where?: PlayerWhereInput) => BatchPayloadPromise;
  createTeam: (data: TeamCreateInput) => TeamPromise;
  updateTeam: (args: {
    data: TeamUpdateInput;
    where: TeamWhereUniqueInput;
  }) => TeamPromise;
  updateManyTeams: (args: {
    data: TeamUpdateManyMutationInput;
    where?: TeamWhereInput;
  }) => BatchPayloadPromise;
  upsertTeam: (args: {
    where: TeamWhereUniqueInput;
    create: TeamCreateInput;
    update: TeamUpdateInput;
  }) => TeamPromise;
  deleteTeam: (where: TeamWhereUniqueInput) => TeamPromise;
  deleteManyTeams: (where?: TeamWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  player: (
    where?: PlayerSubscriptionWhereInput,
  ) => PlayerSubscriptionPayloadSubscription;
  team: (
    where?: TeamSubscriptionWhereInput,
  ) => TeamSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type Region = 'NA' | 'EU';

export type Division =
  | 'BEGINNER'
  | 'ROOKIE'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'EXPERT';

export type PlayerOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'bnet_ASC'
  | 'bnet_DESC'
  | 'discord_ASC'
  | 'discord_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'sr_ASC'
  | 'sr_DESC';

export type Role =
  | 'MAIN_TANK'
  | 'OFF_TANK'
  | 'HITSCAN_DPS'
  | 'PROJECTILE_DPS'
  | 'MAIN_SUPPORT'
  | 'FLEX_SUPPORT'
  | 'SUB'
  | 'PLAYER'
  | 'FLEX';

export type TeamOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'region_ASC'
  | 'region_DESC'
  | 'division_ASC'
  | 'division_DESC'
  | 'losses_ASC'
  | 'losses_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'pointDifference_ASC'
  | 'pointDifference_DESC'
  | 'setWins_ASC'
  | 'setWins_DESC'
  | 'slug_ASC'
  | 'slug_DESC'
  | 'tieBreakersWon_ASC'
  | 'tieBreakersWon_DESC'
  | 'ties_ASC'
  | 'ties_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'wins_ASC'
  | 'wins_DESC';

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED';

export interface TeamCreateWithoutPlayersInput {
  id?: Maybe<ID_Input>;
  region: Region;
  division: Division;
  losses?: Maybe<Int>;
  name: String;
  pointDifference?: Maybe<Int>;
  setWins?: Maybe<Int>;
  slug: String;
  tieBreakersWon?: Maybe<Int>;
  ties?: Maybe<Int>;
  wins?: Maybe<Int>;
}

export type PlayerWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface PlayerUpdateManyWithoutTeamInput {
  create?: Maybe<PlayerCreateWithoutTeamInput[] | PlayerCreateWithoutTeamInput>;
  delete?: Maybe<PlayerWhereUniqueInput[] | PlayerWhereUniqueInput>;
  connect?: Maybe<PlayerWhereUniqueInput[] | PlayerWhereUniqueInput>;
  set?: Maybe<PlayerWhereUniqueInput[] | PlayerWhereUniqueInput>;
  disconnect?: Maybe<PlayerWhereUniqueInput[] | PlayerWhereUniqueInput>;
  update?: Maybe<
    | PlayerUpdateWithWhereUniqueWithoutTeamInput[]
    | PlayerUpdateWithWhereUniqueWithoutTeamInput
  >;
  upsert?: Maybe<
    | PlayerUpsertWithWhereUniqueWithoutTeamInput[]
    | PlayerUpsertWithWhereUniqueWithoutTeamInput
  >;
  deleteMany?: Maybe<PlayerScalarWhereInput[] | PlayerScalarWhereInput>;
  updateMany?: Maybe<
    | PlayerUpdateManyWithWhereNestedInput[]
    | PlayerUpdateManyWithWhereNestedInput
  >;
}

export interface TeamCreateInput {
  id?: Maybe<ID_Input>;
  region: Region;
  division: Division;
  losses?: Maybe<Int>;
  name: String;
  players?: Maybe<PlayerCreateManyWithoutTeamInput>;
  pointDifference?: Maybe<Int>;
  setWins?: Maybe<Int>;
  slug: String;
  tieBreakersWon?: Maybe<Int>;
  ties?: Maybe<Int>;
  wins?: Maybe<Int>;
}

export interface TeamUpdateInput {
  region?: Maybe<Region>;
  division?: Maybe<Division>;
  losses?: Maybe<Int>;
  name?: Maybe<String>;
  players?: Maybe<PlayerUpdateManyWithoutTeamInput>;
  pointDifference?: Maybe<Int>;
  setWins?: Maybe<Int>;
  slug?: Maybe<String>;
  tieBreakersWon?: Maybe<Int>;
  ties?: Maybe<Int>;
  wins?: Maybe<Int>;
}

export interface TeamUpsertWithoutPlayersInput {
  update: TeamUpdateWithoutPlayersDataInput;
  create: TeamCreateWithoutPlayersInput;
}

export interface TeamSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<TeamWhereInput>;
  AND?: Maybe<TeamSubscriptionWhereInput[] | TeamSubscriptionWhereInput>;
  OR?: Maybe<TeamSubscriptionWhereInput[] | TeamSubscriptionWhereInput>;
  NOT?: Maybe<TeamSubscriptionWhereInput[] | TeamSubscriptionWhereInput>;
}

export interface TeamUpdateManyMutationInput {
  region?: Maybe<Region>;
  division?: Maybe<Division>;
  losses?: Maybe<Int>;
  name?: Maybe<String>;
  pointDifference?: Maybe<Int>;
  setWins?: Maybe<Int>;
  slug?: Maybe<String>;
  tieBreakersWon?: Maybe<Int>;
  ties?: Maybe<Int>;
  wins?: Maybe<Int>;
}

export interface PlayerCreateInput {
  id?: Maybe<ID_Input>;
  bnet: String;
  discord: String;
  role: Role;
  sr?: Maybe<Int>;
  team?: Maybe<TeamCreateOneWithoutPlayersInput>;
}

export interface PlayerUpdateManyWithWhereNestedInput {
  where: PlayerScalarWhereInput;
  data: PlayerUpdateManyDataInput;
}

export interface TeamCreateOneWithoutPlayersInput {
  create?: Maybe<TeamCreateWithoutPlayersInput>;
  connect?: Maybe<TeamWhereUniqueInput>;
}

export interface PlayerUpsertWithWhereUniqueWithoutTeamInput {
  where: PlayerWhereUniqueInput;
  update: PlayerUpdateWithoutTeamDataInput;
  create: PlayerCreateWithoutTeamInput;
}

export interface PlayerCreateWithoutTeamInput {
  id?: Maybe<ID_Input>;
  bnet: String;
  discord: String;
  role: Role;
  sr?: Maybe<Int>;
}

export interface PlayerUpdateWithoutTeamDataInput {
  bnet?: Maybe<String>;
  discord?: Maybe<String>;
  role?: Maybe<Role>;
  sr?: Maybe<Int>;
}

export interface PlayerUpdateInput {
  bnet?: Maybe<String>;
  discord?: Maybe<String>;
  role?: Maybe<Role>;
  sr?: Maybe<Int>;
  team?: Maybe<TeamUpdateOneWithoutPlayersInput>;
}

export interface TeamWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  region?: Maybe<Region>;
  region_not?: Maybe<Region>;
  region_in?: Maybe<Region[] | Region>;
  region_not_in?: Maybe<Region[] | Region>;
  division?: Maybe<Division>;
  division_not?: Maybe<Division>;
  division_in?: Maybe<Division[] | Division>;
  division_not_in?: Maybe<Division[] | Division>;
  losses?: Maybe<Int>;
  losses_not?: Maybe<Int>;
  losses_in?: Maybe<Int[] | Int>;
  losses_not_in?: Maybe<Int[] | Int>;
  losses_lt?: Maybe<Int>;
  losses_lte?: Maybe<Int>;
  losses_gt?: Maybe<Int>;
  losses_gte?: Maybe<Int>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  players_every?: Maybe<PlayerWhereInput>;
  players_some?: Maybe<PlayerWhereInput>;
  players_none?: Maybe<PlayerWhereInput>;
  pointDifference?: Maybe<Int>;
  pointDifference_not?: Maybe<Int>;
  pointDifference_in?: Maybe<Int[] | Int>;
  pointDifference_not_in?: Maybe<Int[] | Int>;
  pointDifference_lt?: Maybe<Int>;
  pointDifference_lte?: Maybe<Int>;
  pointDifference_gt?: Maybe<Int>;
  pointDifference_gte?: Maybe<Int>;
  setWins?: Maybe<Int>;
  setWins_not?: Maybe<Int>;
  setWins_in?: Maybe<Int[] | Int>;
  setWins_not_in?: Maybe<Int[] | Int>;
  setWins_lt?: Maybe<Int>;
  setWins_lte?: Maybe<Int>;
  setWins_gt?: Maybe<Int>;
  setWins_gte?: Maybe<Int>;
  slug?: Maybe<String>;
  slug_not?: Maybe<String>;
  slug_in?: Maybe<String[] | String>;
  slug_not_in?: Maybe<String[] | String>;
  slug_lt?: Maybe<String>;
  slug_lte?: Maybe<String>;
  slug_gt?: Maybe<String>;
  slug_gte?: Maybe<String>;
  slug_contains?: Maybe<String>;
  slug_not_contains?: Maybe<String>;
  slug_starts_with?: Maybe<String>;
  slug_not_starts_with?: Maybe<String>;
  slug_ends_with?: Maybe<String>;
  slug_not_ends_with?: Maybe<String>;
  tieBreakersWon?: Maybe<Int>;
  tieBreakersWon_not?: Maybe<Int>;
  tieBreakersWon_in?: Maybe<Int[] | Int>;
  tieBreakersWon_not_in?: Maybe<Int[] | Int>;
  tieBreakersWon_lt?: Maybe<Int>;
  tieBreakersWon_lte?: Maybe<Int>;
  tieBreakersWon_gt?: Maybe<Int>;
  tieBreakersWon_gte?: Maybe<Int>;
  ties?: Maybe<Int>;
  ties_not?: Maybe<Int>;
  ties_in?: Maybe<Int[] | Int>;
  ties_not_in?: Maybe<Int[] | Int>;
  ties_lt?: Maybe<Int>;
  ties_lte?: Maybe<Int>;
  ties_gt?: Maybe<Int>;
  ties_gte?: Maybe<Int>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  wins?: Maybe<Int>;
  wins_not?: Maybe<Int>;
  wins_in?: Maybe<Int[] | Int>;
  wins_not_in?: Maybe<Int[] | Int>;
  wins_lt?: Maybe<Int>;
  wins_lte?: Maybe<Int>;
  wins_gt?: Maybe<Int>;
  wins_gte?: Maybe<Int>;
  AND?: Maybe<TeamWhereInput[] | TeamWhereInput>;
  OR?: Maybe<TeamWhereInput[] | TeamWhereInput>;
  NOT?: Maybe<TeamWhereInput[] | TeamWhereInput>;
}

export interface TeamUpdateOneWithoutPlayersInput {
  create?: Maybe<TeamCreateWithoutPlayersInput>;
  update?: Maybe<TeamUpdateWithoutPlayersDataInput>;
  upsert?: Maybe<TeamUpsertWithoutPlayersInput>;
  delete?: Maybe<Boolean>;
  disconnect?: Maybe<Boolean>;
  connect?: Maybe<TeamWhereUniqueInput>;
}

export interface PlayerUpdateManyDataInput {
  bnet?: Maybe<String>;
  discord?: Maybe<String>;
  role?: Maybe<Role>;
  sr?: Maybe<Int>;
}

export interface PlayerCreateManyWithoutTeamInput {
  create?: Maybe<PlayerCreateWithoutTeamInput[] | PlayerCreateWithoutTeamInput>;
  connect?: Maybe<PlayerWhereUniqueInput[] | PlayerWhereUniqueInput>;
}

export interface PlayerUpdateManyMutationInput {
  bnet?: Maybe<String>;
  discord?: Maybe<String>;
  role?: Maybe<Role>;
  sr?: Maybe<Int>;
}

export interface PlayerWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  bnet?: Maybe<String>;
  bnet_not?: Maybe<String>;
  bnet_in?: Maybe<String[] | String>;
  bnet_not_in?: Maybe<String[] | String>;
  bnet_lt?: Maybe<String>;
  bnet_lte?: Maybe<String>;
  bnet_gt?: Maybe<String>;
  bnet_gte?: Maybe<String>;
  bnet_contains?: Maybe<String>;
  bnet_not_contains?: Maybe<String>;
  bnet_starts_with?: Maybe<String>;
  bnet_not_starts_with?: Maybe<String>;
  bnet_ends_with?: Maybe<String>;
  bnet_not_ends_with?: Maybe<String>;
  discord?: Maybe<String>;
  discord_not?: Maybe<String>;
  discord_in?: Maybe<String[] | String>;
  discord_not_in?: Maybe<String[] | String>;
  discord_lt?: Maybe<String>;
  discord_lte?: Maybe<String>;
  discord_gt?: Maybe<String>;
  discord_gte?: Maybe<String>;
  discord_contains?: Maybe<String>;
  discord_not_contains?: Maybe<String>;
  discord_starts_with?: Maybe<String>;
  discord_not_starts_with?: Maybe<String>;
  discord_ends_with?: Maybe<String>;
  discord_not_ends_with?: Maybe<String>;
  role?: Maybe<Role>;
  role_not?: Maybe<Role>;
  role_in?: Maybe<Role[] | Role>;
  role_not_in?: Maybe<Role[] | Role>;
  sr?: Maybe<Int>;
  sr_not?: Maybe<Int>;
  sr_in?: Maybe<Int[] | Int>;
  sr_not_in?: Maybe<Int[] | Int>;
  sr_lt?: Maybe<Int>;
  sr_lte?: Maybe<Int>;
  sr_gt?: Maybe<Int>;
  sr_gte?: Maybe<Int>;
  team?: Maybe<TeamWhereInput>;
  AND?: Maybe<PlayerWhereInput[] | PlayerWhereInput>;
  OR?: Maybe<PlayerWhereInput[] | PlayerWhereInput>;
  NOT?: Maybe<PlayerWhereInput[] | PlayerWhereInput>;
}

export interface TeamUpdateWithoutPlayersDataInput {
  region?: Maybe<Region>;
  division?: Maybe<Division>;
  losses?: Maybe<Int>;
  name?: Maybe<String>;
  pointDifference?: Maybe<Int>;
  setWins?: Maybe<Int>;
  slug?: Maybe<String>;
  tieBreakersWon?: Maybe<Int>;
  ties?: Maybe<Int>;
  wins?: Maybe<Int>;
}

export interface PlayerScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  bnet?: Maybe<String>;
  bnet_not?: Maybe<String>;
  bnet_in?: Maybe<String[] | String>;
  bnet_not_in?: Maybe<String[] | String>;
  bnet_lt?: Maybe<String>;
  bnet_lte?: Maybe<String>;
  bnet_gt?: Maybe<String>;
  bnet_gte?: Maybe<String>;
  bnet_contains?: Maybe<String>;
  bnet_not_contains?: Maybe<String>;
  bnet_starts_with?: Maybe<String>;
  bnet_not_starts_with?: Maybe<String>;
  bnet_ends_with?: Maybe<String>;
  bnet_not_ends_with?: Maybe<String>;
  discord?: Maybe<String>;
  discord_not?: Maybe<String>;
  discord_in?: Maybe<String[] | String>;
  discord_not_in?: Maybe<String[] | String>;
  discord_lt?: Maybe<String>;
  discord_lte?: Maybe<String>;
  discord_gt?: Maybe<String>;
  discord_gte?: Maybe<String>;
  discord_contains?: Maybe<String>;
  discord_not_contains?: Maybe<String>;
  discord_starts_with?: Maybe<String>;
  discord_not_starts_with?: Maybe<String>;
  discord_ends_with?: Maybe<String>;
  discord_not_ends_with?: Maybe<String>;
  role?: Maybe<Role>;
  role_not?: Maybe<Role>;
  role_in?: Maybe<Role[] | Role>;
  role_not_in?: Maybe<Role[] | Role>;
  sr?: Maybe<Int>;
  sr_not?: Maybe<Int>;
  sr_in?: Maybe<Int[] | Int>;
  sr_not_in?: Maybe<Int[] | Int>;
  sr_lt?: Maybe<Int>;
  sr_lte?: Maybe<Int>;
  sr_gt?: Maybe<Int>;
  sr_gte?: Maybe<Int>;
  AND?: Maybe<PlayerScalarWhereInput[] | PlayerScalarWhereInput>;
  OR?: Maybe<PlayerScalarWhereInput[] | PlayerScalarWhereInput>;
  NOT?: Maybe<PlayerScalarWhereInput[] | PlayerScalarWhereInput>;
}

export interface PlayerSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<PlayerWhereInput>;
  AND?: Maybe<PlayerSubscriptionWhereInput[] | PlayerSubscriptionWhereInput>;
  OR?: Maybe<PlayerSubscriptionWhereInput[] | PlayerSubscriptionWhereInput>;
  NOT?: Maybe<PlayerSubscriptionWhereInput[] | PlayerSubscriptionWhereInput>;
}

export interface PlayerUpdateWithWhereUniqueWithoutTeamInput {
  where: PlayerWhereUniqueInput;
  data: PlayerUpdateWithoutTeamDataInput;
}

export type TeamWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  name?: Maybe<String>;
  slug?: Maybe<String>;
}>;

export interface NodeNode {
  id: ID_Output;
}

export interface TeamPreviousValues {
  id: ID_Output;
  region: Region;
  division: Division;
  losses?: Int;
  name: String;
  pointDifference?: Int;
  setWins?: Int;
  slug: String;
  tieBreakersWon?: Int;
  ties?: Int;
  updatedAt: DateTimeOutput;
  wins?: Int;
}

export interface TeamPreviousValuesPromise
  extends Promise<TeamPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  region: () => Promise<Region>;
  division: () => Promise<Division>;
  losses: () => Promise<Int>;
  name: () => Promise<String>;
  pointDifference: () => Promise<Int>;
  setWins: () => Promise<Int>;
  slug: () => Promise<String>;
  tieBreakersWon: () => Promise<Int>;
  ties: () => Promise<Int>;
  updatedAt: () => Promise<DateTimeOutput>;
  wins: () => Promise<Int>;
}

export interface TeamPreviousValuesSubscription
  extends Promise<AsyncIterator<TeamPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  region: () => Promise<AsyncIterator<Region>>;
  division: () => Promise<AsyncIterator<Division>>;
  losses: () => Promise<AsyncIterator<Int>>;
  name: () => Promise<AsyncIterator<String>>;
  pointDifference: () => Promise<AsyncIterator<Int>>;
  setWins: () => Promise<AsyncIterator<Int>>;
  slug: () => Promise<AsyncIterator<String>>;
  tieBreakersWon: () => Promise<AsyncIterator<Int>>;
  ties: () => Promise<AsyncIterator<Int>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  wins: () => Promise<AsyncIterator<Int>>;
}

export interface AggregatePlayer {
  count: Int;
}

export interface AggregatePlayerPromise
  extends Promise<AggregatePlayer>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregatePlayerSubscription
  extends Promise<AsyncIterator<AggregatePlayer>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface Player {
  id: ID_Output;
  bnet: String;
  discord: String;
  role: Role;
  sr?: Int;
}

export interface PlayerPromise extends Promise<Player>, Fragmentable {
  id: () => Promise<ID_Output>;
  bnet: () => Promise<String>;
  discord: () => Promise<String>;
  role: () => Promise<Role>;
  sr: () => Promise<Int>;
  team: <T = TeamPromise>() => T;
}

export interface PlayerSubscription
  extends Promise<AsyncIterator<Player>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  bnet: () => Promise<AsyncIterator<String>>;
  discord: () => Promise<AsyncIterator<String>>;
  role: () => Promise<AsyncIterator<Role>>;
  sr: () => Promise<AsyncIterator<Int>>;
  team: <T = TeamSubscription>() => T;
}

export interface PlayerNullablePromise
  extends Promise<Player | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  bnet: () => Promise<String>;
  discord: () => Promise<String>;
  role: () => Promise<Role>;
  sr: () => Promise<Int>;
  team: <T = TeamPromise>() => T;
}

export interface PlayerEdge {
  node: Player;
  cursor: String;
}

export interface PlayerEdgePromise extends Promise<PlayerEdge>, Fragmentable {
  node: <T = PlayerPromise>() => T;
  cursor: () => Promise<String>;
}

export interface PlayerEdgeSubscription
  extends Promise<AsyncIterator<PlayerEdge>>,
    Fragmentable {
  node: <T = PlayerSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface Team {
  id: ID_Output;
  region: Region;
  division: Division;
  losses?: Int;
  name: String;
  pointDifference?: Int;
  setWins?: Int;
  slug: String;
  tieBreakersWon?: Int;
  ties?: Int;
  updatedAt: DateTimeOutput;
  wins?: Int;
}

export interface TeamPromise extends Promise<Team>, Fragmentable {
  id: () => Promise<ID_Output>;
  region: () => Promise<Region>;
  division: () => Promise<Division>;
  losses: () => Promise<Int>;
  name: () => Promise<String>;
  players: <T = FragmentableArray<Player>>(args?: {
    where?: PlayerWhereInput;
    orderBy?: PlayerOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  pointDifference: () => Promise<Int>;
  setWins: () => Promise<Int>;
  slug: () => Promise<String>;
  tieBreakersWon: () => Promise<Int>;
  ties: () => Promise<Int>;
  updatedAt: () => Promise<DateTimeOutput>;
  wins: () => Promise<Int>;
}

export interface TeamSubscription
  extends Promise<AsyncIterator<Team>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  region: () => Promise<AsyncIterator<Region>>;
  division: () => Promise<AsyncIterator<Division>>;
  losses: () => Promise<AsyncIterator<Int>>;
  name: () => Promise<AsyncIterator<String>>;
  players: <T = Promise<AsyncIterator<PlayerSubscription>>>(args?: {
    where?: PlayerWhereInput;
    orderBy?: PlayerOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  pointDifference: () => Promise<AsyncIterator<Int>>;
  setWins: () => Promise<AsyncIterator<Int>>;
  slug: () => Promise<AsyncIterator<String>>;
  tieBreakersWon: () => Promise<AsyncIterator<Int>>;
  ties: () => Promise<AsyncIterator<Int>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  wins: () => Promise<AsyncIterator<Int>>;
}

export interface TeamNullablePromise
  extends Promise<Team | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  region: () => Promise<Region>;
  division: () => Promise<Division>;
  losses: () => Promise<Int>;
  name: () => Promise<String>;
  players: <T = FragmentableArray<Player>>(args?: {
    where?: PlayerWhereInput;
    orderBy?: PlayerOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  pointDifference: () => Promise<Int>;
  setWins: () => Promise<Int>;
  slug: () => Promise<String>;
  tieBreakersWon: () => Promise<Int>;
  ties: () => Promise<Int>;
  updatedAt: () => Promise<DateTimeOutput>;
  wins: () => Promise<Int>;
}

export interface AggregateTeam {
  count: Int;
}

export interface AggregateTeamPromise
  extends Promise<AggregateTeam>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateTeamSubscription
  extends Promise<AsyncIterator<AggregateTeam>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface PlayerSubscriptionPayload {
  mutation: MutationType;
  node: Player;
  updatedFields: String[];
  previousValues: PlayerPreviousValues;
}

export interface PlayerSubscriptionPayloadPromise
  extends Promise<PlayerSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = PlayerPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = PlayerPreviousValuesPromise>() => T;
}

export interface PlayerSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<PlayerSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = PlayerSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = PlayerPreviousValuesSubscription>() => T;
}

export interface PlayerConnection {
  pageInfo: PageInfo;
  edges: PlayerEdge[];
}

export interface PlayerConnectionPromise
  extends Promise<PlayerConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<PlayerEdge>>() => T;
  aggregate: <T = AggregatePlayerPromise>() => T;
}

export interface PlayerConnectionSubscription
  extends Promise<AsyncIterator<PlayerConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<PlayerEdgeSubscription>>>() => T;
  aggregate: <T = AggregatePlayerSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface TeamEdge {
  node: Team;
  cursor: String;
}

export interface TeamEdgePromise extends Promise<TeamEdge>, Fragmentable {
  node: <T = TeamPromise>() => T;
  cursor: () => Promise<String>;
}

export interface TeamEdgeSubscription
  extends Promise<AsyncIterator<TeamEdge>>,
    Fragmentable {
  node: <T = TeamSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface TeamSubscriptionPayload {
  mutation: MutationType;
  node: Team;
  updatedFields: String[];
  previousValues: TeamPreviousValues;
}

export interface TeamSubscriptionPayloadPromise
  extends Promise<TeamSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = TeamPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = TeamPreviousValuesPromise>() => T;
}

export interface TeamSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<TeamSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = TeamSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = TeamPreviousValuesSubscription>() => T;
}

export interface PlayerPreviousValues {
  id: ID_Output;
  bnet: String;
  discord: String;
  role: Role;
  sr?: Int;
}

export interface PlayerPreviousValuesPromise
  extends Promise<PlayerPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  bnet: () => Promise<String>;
  discord: () => Promise<String>;
  role: () => Promise<Role>;
  sr: () => Promise<Int>;
}

export interface PlayerPreviousValuesSubscription
  extends Promise<AsyncIterator<PlayerPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  bnet: () => Promise<AsyncIterator<String>>;
  discord: () => Promise<AsyncIterator<String>>;
  role: () => Promise<AsyncIterator<Role>>;
  sr: () => Promise<AsyncIterator<Int>>;
}

export interface TeamConnection {
  pageInfo: PageInfo;
  edges: TeamEdge[];
}

export interface TeamConnectionPromise
  extends Promise<TeamConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<TeamEdge>>() => T;
  aggregate: <T = AggregateTeamPromise>() => T;
}

export interface TeamConnectionSubscription
  extends Promise<AsyncIterator<TeamConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<TeamEdgeSubscription>>>() => T;
  aggregate: <T = AggregateTeamSubscription>() => T;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: 'Division',
    embedded: false,
  },
  {
    name: 'Region',
    embedded: false,
  },
  {
    name: 'Role',
    embedded: false,
  },
  {
    name: 'Player',
    embedded: false,
  },
  {
    name: 'Team',
    embedded: false,
  },
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `${process.env['GITGUD_PRISMA_ENDPOINT']}`,
});
export const prisma = new Prisma();
