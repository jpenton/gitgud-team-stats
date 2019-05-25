import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Container from '../components/Container';
import Header from '../components/Header';
import { PageProps } from '../types';

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
        <Query<GetTeamQueryData> query={GET_TEAM_QUERY} variables={{ id }}>
          {({ data }) =>
            data && data.team ? (
              <Container addMargin>
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
              </Container>
            ) : null
          }
        </Query>
      </>
    );
  }
}

export default Team;
