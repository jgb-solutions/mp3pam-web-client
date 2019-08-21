import {
  SYNC_PLAYER_STATE,
  PLAY_SET,
  PAUSE_PLAYER,
  RESUME_SET,
} from '../actions/types';
import { PAUSE, RESUME } from '../actions/actions';

const INITIAL_PLAYER_STATE = {
  volume: 80,
  isPlaying: false,
  repeat: 'none',
  position: 0,
  elapsed: '00.00',
  currentTime: 0,
  duration: '00.00',
  onRepeat: false,
  isShuffled: false,
  set: {
    id: 2342423,
    items: [],
  },
  action: null,
  currentTrack: {
    title: 'Bad News',
    detail:
      "Cat, 'if you don't explain it is right?' 'In my youth,' Father William replied to his ear. Alice considered a little, and then said 'The fourth.' 'Two days wrong!' sighed the Lory, as soon as she.",
    lyrics:
      "She went in without knocking, and hurried off at once, while all the jurymen are back in a minute or two, they began moving about again, and looking at them with large round eyes, and half believed herself in Wonderland, though she knew that it might tell her something worth hearing. For some minutes it puffed away without speaking, but at the bottom of the court. 'What do you mean \"purpose\"?' said Alice. 'Then you should say what you would seem to come once a week: HE taught us Drawling, Stretching, and Fainting in Coils.' 'What was THAT like?' said Alice. 'Well, I never heard of \"Uglification,\"' Alice ventured to ask. 'Suppose we change the subject,' the March Hare and the Mock Turtle, 'but if they do, why then they're a kind of serpent, that's all I can say.' This was such a puzzled expression that she was now only ten inches high, and her eyes filled with tears again as she could. 'The game's going on between the executioner, the King, 'or I'll have you executed, whether you're a.",
    url: '/api/v1/musics/42139505',
    play_count: 0,
    play_url: 'https://audios.mp3pam.com/OMVR-Bad-News.mp3',
    download_count: 0,
    download_url: '/t/42139505',
    image: 'https://images.mp3pam.com/demo/OMVR-Bad-News-2016-2480x2480.jpg',
    favorite: true,
    category: {
      name: 'Konpa',
      slug: 'konpa',
      url: '/api/v1/categories/konpa'
    },
    artist: {
      avatar: 'https://images.mp3pam.com/demo/logo.jpg',
      bio: null,
      musics: '/api/v1/artists/77868635/musics',
      name: 'OMVR',
      stageName: 'OMVR',
      url: '/api/v1/artists/77868635',
      verified: false
    }
  },
  playedTracks: []
};
export default function(playerState = INITIAL_PLAYER_STATE, playerAction) {
  const { type, payload } = playerAction;

  switch (type) {
    case SYNC_PLAYER_STATE:
      return { ...playerState, ...payload.updatedState };
    case PLAY_SET:
      return { ...playerState, ...{ set: payload.set } };
    case RESUME_SET:
      return { ...playerState, ...{ action: payload.action  } };
    case PAUSE_PLAYER:
      return { ...playerState, ...{ action: payload.action } };
    default:
      return playerState;
  }
}
