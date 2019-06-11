import { IPlayer } from '../types';

const isPlayerOverSR = (player: IPlayer) => {
  return player.sr !== null && player.sr > 2999;
};

export default isPlayerOverSR;
