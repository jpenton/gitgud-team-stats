import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Container from '../components/Container';
import Header from '../components/Header';
import { PageProps } from '../types';
import Head from 'next/head';
import classnames from 'classnames';
import Table from '../components/Table';

const GET_TEAM_QUERY = gql`
  query GET_TEAM_QUERY($slug: String!) {
    team(slug: $slug) {
      id
      name
      players {
        id
        bnet
        role
        discord
        sr
      }
    }
  }
`;
interface GetTeamQueryData {
  team: {
    id: string;
    name: string;
    players:
      | {
          id: string;
          discord: string;
          bnet: string;
          role: string;
          sr: number | null;
        }[]
      | null;
  };
}

interface IProps extends PageProps {
  query: {
    slug: string;
  };
}

const roleToText: Record<string, string> = {
  MAIN_TANK: 'Main Tank',
  OFF_TANK: 'Off Tank',
  FLEX_SUPPORT: 'Flex Support',
  MAIN_SUPPORT: 'Main Support',
  HITSCAN_DPS: 'Hitscan DPS',
  PROJECTILE_DPS: 'Projectile DPS',
  SUB: 'Sub',
  PLAYER: 'Player',
};

class Team extends React.Component<IProps> {
  render() {
    const {
      pathname,
      query: { slug },
    } = this.props;

    return (
      <>
        <Header pathname={pathname} />
        <Container addMargin>
          <Query<GetTeamQueryData> query={GET_TEAM_QUERY} variables={{ slug }}>
            {({ data }) =>
              data && data.team ? (
                <>
                  <Head>
                    <title>{`${data.team.name} | GitGud Stats`}</title>
                  </Head>
                  <h2>{data.team.name}</h2>
                  {data.team.players ? (
                    <Table
                      headers={['Discord', 'Role', 'BNet', 'SR']}
                      rows={data.team.players.map(player => ({
                        content: [
                          player.discord,
                          roleToText[player.role],
                          player.bnet,
                          <div className="flex justify-between items-center">
                            <span>{player.sr}</span>
                            <div className="ml-4 flex flex-no-wrap">
                              <a
                                className="mr-2 inline-block w-5 h-5"
                                href={`https://playoverwatch.com/en-us/career/pc/${player.bnet.replace(
                                  '#',
                                  '-',
                                )}`}
                                target="_blank"
                              >
                                <img
                                  src="https://gitgud.nyc3.cdn.digitaloceanspaces.com/images/overwatch-logo.png"
                                  alt="overwatch"
                                />
                              </a>
                              <a
                                className="inline-block w-5 h-5"
                                href={`https://www.overbuff.com/players/pc/${player.bnet.replace(
                                  '#',
                                  '-',
                                )}?mode=competitive`}
                                target="_blank"
                              >
                                <img
                                  src="https://gitgud.nyc3.cdn.digitaloceanspaces.com/images/overbuff-logo.png"
                                  alt="overbuff"
                                />
                              </a>
                            </div>
                          </div>,
                        ],
                        red: player.sr !== null && player.sr > 2999,
                        yellow: player.sr === null,
                      }))}
                    />
                  ) : null}
                  {/* <div className="overflow-x-auto shadow-lg">
                    <table>
                      <tbody>
                        <tr>
                          <th>Discord</th>
                          <th>Role</th>
                          <th>BNet</th>
                          <th>SR</th>
                        </tr>
                        {data.team.players
                          ? data.team.players.map(player => (
                              <tr
                                className={classnames({
                                  'row-red':
                                    player.sr !== null && player.sr > 2999,
                                  'row-yellow': player.sr === null,
                                })}
                                key={player.id}
                              >
                                <td>{player.discord}</td>
                                <td>{roleToText[player.role]}</td>
                                <td>{player.bnet}</td>
                                <td>
                                  <div className="flex justify-between">
                                    <span>{player.sr}</span>
                                    <div className="ml-4 flex items-center">
                                      <a
                                        className="mr-2"
                                        href={`https://playoverwatch.com/en-us/career/pc/${player.bnet.replace(
                                          '#',
                                          '-',
                                        )}`}
                                        target="_blank"
                                      >
                                        <img
                                          className="w-5 h-5"
                                          src="https://gitgud.nyc3.cdn.digitaloceanspaces.com/images/overwatch-logo.png"
                                          alt="overwatch"
                                        />
                                      </a>
                                      <a
                                        href={`https://www.overbuff.com/players/pc/${player.bnet.replace(
                                          '#',
                                          '-',
                                        )}?mode=competitive`}
                                        target="_blank"
                                      >
                                        <img
                                          className="w-5 h-5"
                                          src="https://gitgud.nyc3.cdn.digitaloceanspaces.com/images/overbuff-logo.png"
                                          alt="overbuff"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div> */}
                </>
              ) : null
            }
          </Query>
        </Container>
      </>
    );
  }
}

export default Team;
