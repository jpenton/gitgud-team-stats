import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Container from '../components/Container';
import Header from '../components/Header';
import { PageProps, IPlayer, ITeam } from '../types';
import Head from 'next/head';
import isPlayerOverSR from '../lib/isPlayerOverSR';
import Table from '../components/Table';
import classnames from 'classnames';

const GET_TEAMS_QUERY = gql`
  query GET_TEAMS_QUERY($division: Division, $region: Region) {
    teams(division: $division, region: $region) {
      id
      name
      players {
        id
        sr
      }
      slug
      wins
      losses
      ties
      pointDifference
      tieBreakersWon
      setWins
    }
  }
`;

class Standings extends React.Component<PageProps> {
  calculateAverageSR = (players: IPlayer[]): number | null => {
    if (!players) {
      return null;
    }

    const filteredPlayers = players.filter(i => i.sr !== null);
    const total = filteredPlayers.reduce(
      (prev, curr) => prev + (curr.sr as number),
      0,
    );

    if (total === 0) {
      return null;
    }

    return Math.floor(total / filteredPlayers.length);
  };

  render() {
    const {
      query: { division },
    } = this.props;

    return (
      <>
        <Head>
          <title>Standings | GitGud Stats</title>
        </Head>
        <Header pathname={this.props.pathname} />
        <Container addMargin>
          <h2>Standings</h2>
          <div className="flex flex-wrap">
            <div className="sidebar lg:pr-8 mb-6">
              <h6>Divisions</h6>
              <ul>
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      division: 'BEGINNER',
                    },
                  }}
                >
                  <a
                    className={classnames({
                      active: division === 'BEGINNER' || !division,
                    })}
                  >
                    Beginner
                  </a>
                </Link>
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      division: 'ROOKIE',
                    },
                  }}
                >
                  <a
                    className={classnames({
                      active: division === 'ROOKIE',
                    })}
                  >
                    Rookie
                  </a>
                </Link>
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      division: 'INTERMEDIATE',
                    },
                  }}
                >
                  <a
                    className={classnames({
                      active: division === 'INTERMEDIATE',
                    })}
                  >
                    Intermediate
                  </a>
                </Link>
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      division: 'ADVANCED',
                    },
                  }}
                >
                  <a
                    className={classnames({
                      active: division === 'ADVANCED',
                    })}
                  >
                    Advanced
                  </a>
                </Link>
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      division: 'EXPERT',
                    },
                  }}
                >
                  <a
                    className={classnames({
                      active: division === 'EXPERT',
                    })}
                  >
                    Expert
                  </a>
                </Link>
              </ul>
            </div>
            <div className="flex-1 lg:pl-8">
              <Query<{ teams: ITeam[] }>
                query={GET_TEAMS_QUERY}
                variables={{ region: 'NA', division: division || 'BEGINNER' }}
              >
                {({ data }) =>
                  data ? (
                    <Table
                      dashedIndex={7}
                      headers={[
                        'Name',
                        'Average SR',
                        'Record (W-L-T)',
                        'Point Difference',
                      ]}
                      rows={data.teams
                        .filter(team => team.players)
                        .sort((a, b) => {
                          if (a.wins === null) {
                            return 1;
                          } else if (b.wins === null) {
                            return -1;
                          }

                          const wins = b.wins - a.wins;

                          if (wins !== 0) {
                            return wins;
                          }

                          if (a.pointDifference === null) {
                            return 1;
                          } else if (b.pointDifference === null) {
                            return -1;
                          }

                          const pointDifference =
                            b.pointDifference - a.pointDifference;

                          if (pointDifference !== 0) {
                            return pointDifference;
                          }

                          if (a.tieBreakersWon === null) {
                            return 1;
                          } else if (b.tieBreakersWon === null) {
                            return -1;
                          }

                          const tieBreakersWon =
                            b.tieBreakersWon - a.tieBreakersWon;

                          if (tieBreakersWon !== 0) {
                            return tieBreakersWon;
                          }

                          if (a.setWins === null) {
                            return 1;
                          } else if (b.setWins === null) {
                            return -1;
                          }

                          const setWins = b.setWins - a.setWins;

                          if (setWins !== 0) {
                            return setWins;
                          }

                          return a.name.localeCompare(b.name);
                        })
                        .map(team => ({
                          content: [
                            <Link
                              href={{
                                pathname: '/team',
                                query: {
                                  slug: team.slug,
                                },
                              }}
                            >
                              <a>{team.name}</a>
                            </Link>,
                            team.players
                              ? this.calculateAverageSR(team.players)
                              : null,
                            `${team.wins || 0}-${team.losses ||
                              0}-${team.ties || 0}`,
                            team.pointDifference || 0,
                          ],
                          red: !!(
                            team.players &&
                            team.players.filter(player =>
                              isPlayerOverSR(player, division),
                            ).length !== 0
                          ),
                          yellow: !!(
                            team.players &&
                            team.players.filter(player => !player.sr).length !==
                              0
                          ),
                        }))}
                    />
                  ) : (
                    <h3 className="text-center">Teams not found.</h3>
                  )
                }
              </Query>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default Standings;
