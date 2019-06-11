import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Container from '../components/Container';
import Header from '../components/Header';
import { PageProps, IPlayer, ITeam } from '../types';
import Head from 'next/head';
import classnames from 'classnames';
import isPlayerOverSR from '../lib/isPlayerOverSR';

const GET_TEAMS_QUERY = gql`
  query GET_TEAMS_QUERY {
    teams {
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
    }
  }
`;

class Teams extends React.Component<PageProps> {
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
    return (
      <>
        <Head>
          <title>Teams | GitGud Stats</title>
        </Head>
        <Header pathname={this.props.pathname} />
        <Container addMargin>
          <h2>Teams</h2>
          <Query<{ teams: ITeam[] }> query={GET_TEAMS_QUERY}>
            {({ data }) =>
              data ? (
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Average SR</th>
                      <th>Record (W-L-T)</th>
                      <th>Point Difference</th>
                    </tr>
                    {data.teams
                      .filter(team => team.players)
                      .sort((a, b) => {
                        if (!(a.wins || b.wins)) {
                          return 0;
                        } else if (!a.wins) {
                          return 1;
                        } else if (!b.wins) {
                          return -1;
                        }

                        const wins = b.wins - a.wins;

                        if (wins !== 0) {
                          return wins;
                        }

                        if (!(a.pointDifference || b.pointDifference)) {
                          return 0;
                        } else if (!a.pointDifference) {
                          return 1;
                        } else if (!b.pointDifference) {
                          return -1;
                        }

                        const pointDifference =
                          b.pointDifference - a.pointDifference;

                        if (pointDifference !== 0) {
                          return pointDifference;
                        }

                        return 0;
                      })
                      .map((team, index) =>
                        team.players ? (
                          <tr
                            className={classnames({
                              'row-red':
                                team.players.filter(player =>
                                  isPlayerOverSR(player),
                                ).length !== 0,
                              'row-yellow':
                                team.players.filter(player => !player.sr)
                                  .length !== 0,
                              'border-cool-grey-200 border-dashed': index === 7,
                            })}
                            key={team.id}
                          >
                            <td>
                              <Link
                                href={{
                                  pathname: '/team',
                                  query: {
                                    slug: team.slug,
                                  },
                                }}
                              >
                                <a>{team.name}</a>
                              </Link>
                            </td>
                            <td>
                              {team.players
                                ? this.calculateAverageSR(team.players)
                                : null}
                            </td>
                            <td>
                              {`${team.wins}-${team.losses}-${team.ties}`}
                            </td>
                            <td>{team.pointDifference}</td>
                          </tr>
                        ) : null,
                      )}
                  </tbody>
                </table>
              ) : null
            }
          </Query>
        </Container>
      </>
    );
  }
}

export default Teams;
