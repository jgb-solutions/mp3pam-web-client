import {
  PlayCircleOutline,
  PauseCircleOutline,
} from "@material-ui/icons";
import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/styles";
import { get } from "lodash-es";

import colors from "../utils/colors";
import * as playerActions from "../store/actions/playerActions";
import AppStateInterface from "../interfaces/AppStateInterface";
import ListInterface from "../interfaces/ListInterface";
import { SoundInterface } from "../interfaces/ListInterface";

const useStyles = makeStyles({
  icon: {
    fontSize: 18,
    color: colors.grey,
    '&:hover': {
      color: colors.white
    }
  },
  border: {
    color: colors.white,
    padding: 5,
    border: "1px solid white",
    borderRadius: "50%",
    marginLeft: 15
  },
  button: {
    padding: 0
  },
});

type Props = {
  border?: boolean,
  pauseList(): void,
  resumeList(): void,
  isPlaying: boolean,
  resumeSound(): void,
  pauseSound(): void,
  list: ListInterface,
  sound: SoundInterface,
  playingListHash: string,
  currentSound?: SoundInterface,
  playList(list: ListInterface): void,
  playSound: (sound: SoundInterface) => void,
}

function PlayPause({
  list,
  sound,
  playList,
  isPlaying,
  pauseList,
  resumeList,
  currentSound,
  playingListHash,
  playSound,
  resumeSound,
  pauseSound,
}: Props
) {
  const styles = useStyles();

  const togglePlay = () => {
    if (currentSound && list.hash === playingListHash) {
      if (sound.hash === currentSound.hash && isPlaying) {
        console.log('pause sound')
        pauseSound();
      }

      if (sound.hash === currentSound.hash && !isPlaying) {
        console.log('resume sound')
        resumeSound();
      }

      if (sound.hash !== currentSound.hash) {
        console.log('play sound')
        playSound(sound);
      }
    }

    if (list.hash !== playingListHash) {
      if (isPlaying && playingListHash === list.hash) {
        console.log('pause list')
        pauseList();
      }

      if (!isPlaying && playingListHash === list.hash) {
        console.log('resume list')
        resumeList();
      }

      if (playingListHash !== list.hash) {
        console.log('play list')
        playList(list);
      }
    }
  };

  return currentSound ? (
    <IconButton onClick={togglePlay} className={styles.button}>
      {sound.hash === currentSound.hash && isPlaying ? (
        <PauseCircleOutline
          className={styles.icon}
          style={{ fontSize: 35 }}
        />
      ) : (
          <PlayCircleOutline
            className={styles.icon}
            style={{ fontSize: 35 }}
          />
        )}
    </IconButton>
  ) : null;
}

export default connect(
  ({ player }: AppStateInterface) => ({
    playingListHash: get(player, 'list.hash'),
    isPlaying: player.isPlaying,
    currentSound: player.currentSound
  }),
  {
    playList: playerActions.playList,
    pauseList: playerActions.pauseList,
    resumeList: playerActions.resumeList,
    pauseSound: playerActions.pauseSound,
    resumeSound: playerActions.resumeSound,
    playSound: playerActions.playSound
  }
)(PlayPause);