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
                    </tr>
                    {data.teams
                      .filter(team => team.players)
                      .map(team =>
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
