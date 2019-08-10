import { SYNC_PLAYER_STATE } from './types';

export const syncState = updatedState => ({
  type: SYNC_PLAYER_STATE,
  payload: updatedState
});
