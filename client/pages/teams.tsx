import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Container from '../components/Container';
import Header from '../components/Header';
import { PageProps } from '../types';
import Head from 'next/head';

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

interface ITeam {
  id: string;
  name: string;
  players:
    | {
        id: string;
        sr: number | null;
      }[]
    | null;
  slug: string;
}

class Teams extends React.Component<PageProps> {
  calculateAverageSR = (players: ITeam['players']): number | null => {
    if (!players) {
      return null;
    }

    const filteredPlayers = players.filter(i => i.sr !== null);
    const total = filteredPlayers.reduce(
      (prev, curr) => prev + (curr.sr as number),
      0,
    );

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
                      .map(team => (
                        <tr key={team.id}>
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
                      ))}
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
