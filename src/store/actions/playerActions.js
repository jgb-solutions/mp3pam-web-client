 import {
  SYNC_PLAYER_STATE,
  PLAY_SET,
  PAUSE_PLAYER,
  RESUME_SET
} from './types';
import { PAUSE, PLAY, RESUME } from './actions';

export const syncState = updatedState => ({
  type: SYNC_PLAYER_STATE,
  payload: { updatedState }
});

export const playSet = set => ({
  // fetch set to play
  type: PLAY_SET,
  payload: { set, action: PLAY }
});

export const pauseSet = () => ({
  type: PAUSE_PLAYER,
  payload: { action: PAUSE }
});

export const resumeSet = () => ({
  type: RESUME_SET,
  payload: { action: RESUME }
});