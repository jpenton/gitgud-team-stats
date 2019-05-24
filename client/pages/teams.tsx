import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Link from 'next/link';

const GET_TEAMS_QUERY = gql`
  query GET_TEAMS_QUERY {
    teams {
      id
      name
    }
  }
`;

class Teams extends React.Component {
  render() {
    return (
      <>
        <h1>Teams</h1>
        <Query<{ teams: { id: string; name: string }[] }>
          query={GET_TEAMS_QUERY}
        >
          {({ data }) =>
            data ? (
              <>
                {data.teams.map(team => (
                  <Link
                    key={team.id}
                    href={{
                      pathname: '/team',
                      query: {
                        id: team.id,
                      },
                    }}
                  >
                    <a style={{ display: 'block' }}>{team.name}</a>
                  </Link>
                ))}
              </>
            ) : null
          }
        </Query>
      </>
    );
  }
}

export default Teams;
