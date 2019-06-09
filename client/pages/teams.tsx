import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Container from '../components/Container';
import Header from '../components/Header';
import { PageProps } from '../types';

const GET_TEAMS_QUERY = gql`
  query GET_TEAMS_QUERY {
    teams {
      id
      name
    }
  }
`;

class Teams extends React.Component<PageProps> {
  render() {
    return (
      <>
        <Header pathname={this.props.pathname} />
        <Container addMargin>
          <h2>Teams</h2>
          <Query<{ teams: { id: string; name: string }[] }>
            query={GET_TEAMS_QUERY}
          >
            {({ data }) =>
              data ? (
                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                    </tr>
                    {data.teams.map(team => (
                      <tr key={team.id}>
                        <td>
                          <Link
                            href={{
                              pathname: '/team',
                              query: {
                                id: team.id,
                              },
                            }}
                          >
                            <a>{team.name}</a>
                          </Link>
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
