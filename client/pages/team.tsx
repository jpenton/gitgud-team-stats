import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Container from '../components/Container';
import Header from '../components/Header';
import { PageProps } from '../types';
import Head from 'next/head';

const GET_TEAM_QUERY = gql`
  query GET_TEAM_QUERY($id: ID!) {
    team(id: $id) {
      id
      name
      players {
        id
        bnet
        role
        discord
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
        }[]
      | null;
  };
}

interface IProps extends PageProps {
  query: {
    id: string;
  };
}

class Team extends React.Component<IProps> {
  render() {
    const {
      pathname,
      query: { id },
    } = this.props;

    return (
      <>
        <Header pathname={pathname} />
        <Container addMargin>
          <Query<GetTeamQueryData> query={GET_TEAM_QUERY} variables={{ id }}>
            {({ data }) =>
              data && data.team ? (
                <>
                  <Head>
                    <title>{`${data.team.name} | GitGud Stats`}</title>
                  </Head>
                  <h2>{data.team.name}</h2>
                  <table>
                    <tbody>
                      <tr>
                        <th>Discord</th>
                        <th>Role</th>
                        <th>BNet</th>
                      </tr>
                      {data.team.players
                        ? data.team.players.map(player => (
                            <tr key={player.id}>
                              <td>{player.discord}</td>
                              <td>{player.role}</td>
                              <td>
                                <div className="flex justify-between">
                                  <span>{player.bnet}</span>
                                  <div className="ml-4">
                                    <a
                                      className="mr-2"
                                      href={`https://playoverwatch.com/en-us/career/pc/${player.bnet.replace(
                                        '#',
                                        '-',
                                      )}`}
                                      target="_blank"
                                    >
                                      OW
                                    </a>
                                    <a
                                      href={`https://www.overbuff.com/players/pc/${player.bnet.replace(
                                        '#',
                                        '-',
                                      )}?mode=competitive`}
                                      target="_blank"
                                    >
                                      OB
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
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
