 import {
  SYNC_PLAYER_STATE,
  PLAY_SET,
  PAUSE_SET
} from './types';

export const syncState = updatedState => ({
  type: SYNC_PLAYER_STATE,
  payload: { updatedState }
});

export const playSet = set => ({
  // fetch set to play
  type: PLAY_SET,
  payload: { set }
});

export const pauseSet = () => ({
  type: PAUSE_SET,
});
