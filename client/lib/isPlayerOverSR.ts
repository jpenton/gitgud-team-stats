import { IPlayer } from '../types';

const isPlayerOverSR = (player: IPlayer, division?: string) => {
  return (
    player.sr !== null &&
    player.sr >
      (division === 'BEGINNER' || !division
        ? 2999
        : division === 'ROOKIE'
        ? 3499
        : division === 'INTERMEDIATE'
        ? 3999
        : division === 'ADVANCED'
        ? 4250
        : Number.MAX_SAFE_INTEGER)
  );
};

export default isPlayerOverSR;
