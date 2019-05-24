import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_TEAM_QUERY = gql`
  query GET_TEAM_QUERY($id: ID!) {
    team(id: $id) {
      id
      name
      players {
        id
        bnet
      }
    }
  }
`;
interface GetTeamQueryData {
  team: {
    id: string;
    name: string;
    players: {
      id: string;
      name: string;
      bnet: string;
    }[];
  };
}

interface IProps {
  query: {
    id: string;
  };
}

class Team extends React.Component<IProps> {
  render() {
    const {
      query: { id },
    } = this.props;

    return (
      <Query<GetTeamQueryData> query={GET_TEAM_QUERY} variables={{ id }}>
        {({ data }) =>
          data && data.team ? (
            <>
              <h3>{data.team.name}</h3>
              {data.team.players.map(player => (
                <div key={player.id}>
                  <a
                    href={`https://playoverwatch.com/en-us/career/pc/${player.bnet.replace(
                      '#',
                      '-',
                    )}`}
                    target="_blank"
                  >
                    {player.bnet}
                  </a>
                </div>
              ))}
            </>
          ) : null
        }
      </Query>
    );
  }
}

export default Team;
