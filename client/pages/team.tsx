import * as React from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import { PageProps } from '../types';
import Head from 'next/head';
import Table from '../components/Table';
import isPlayerOverSR from '../lib/isPlayerOverSR';
import { teamsMap } from '../teams';

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

function TeamPage(props: IProps) {
  const {
    pathname,
    query: { slug },
  } = props;
  const team = teamsMap[slug];

  if (!team) {
    return null;
  }

  return (
    <>
      <Header pathname={pathname} />
      <Container addMargin>
        <Head>
          <title>{`${team.name} | GitGud Stats`}</title>
        </Head>
        <h2>{team.name}</h2>
        {team.players ? (
          <Table
            headers={['Discord', 'Role', 'BNet', 'SR']}
            rows={team.players.map(player => ({
              content: [
                player.discord,
                roleToText[player.role],
                player.bnet,
                <div className="flex justify-between items-center">
                  <span>{player.sr}</span>
                  <div className="ml-8 flex flex-no-wrap">
                    <a
                      className="mr-2 inline-block w-5 h-5"
                      href={`https://playoverwatch.com/en-us/career/pc/${player.bnet.replace(
                        '#',
                        '-',
                      )}`}
                      target="_blank"
                    >
                      <img
                        src="https://logonoid.com/images/overwatch-logo.png"
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
                        src="https://www.overbuff.com/assets/favicon.png?v=4503633"
                        alt="overbuff"
                      />
                    </a>
                  </div>
                </div>,
              ],
              red: player.sr !== null && isPlayerOverSR(player, team.division),
              yellow: player.sr === null,
            }))}
          />
        ) : (
          <h3 className="text-center">Players not found.</h3>
        )}
      </Container>
    </>
  );
}

export default TeamPage;
