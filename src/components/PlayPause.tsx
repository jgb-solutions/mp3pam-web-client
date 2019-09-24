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
import TrackInterface from "../interfaces/TrackInterface";

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
  resumeTrack(): void,
  pauseTrack(): void,
  list: ListInterface,
  track: TrackInterface,
  playingListId: string,
  currentTrack?: TrackInterface,
  playList(list: ListInterface): void,
  playTrack: (track: TrackInterface) => void,
}

function PlayPause({
  list,
  track,
  playList,
  isPlaying,
  pauseList,
  resumeList,
  currentTrack,
  playingListId,
  playTrack,
  resumeTrack,
  pauseTrack,
}: Props
) {
  const classes = useStyles();

  const togglePlay = () => {
    if (currentTrack && list.id === playingListId) {
      if (track.hash === currentTrack.hash && isPlaying) {
        pauseTrack();
      }

      if (track.hash === currentTrack.hash && !isPlaying) {
        resumeTrack();
      }

      if (track.hash !== currentTrack.hash) {
        playTrack(track);
      }
    }

    if (list.id !== playingListId) {
      if (isPlaying && playingListId === list.id) {
        pauseList();
      }

      if (!isPlaying && playingListId === list.id) {
        resumeList();
      }

      if (playingListId !== list.id) {
        playList(list);
      }
    }
  };

  return currentTrack ? (
    <IconButton onClick={togglePlay} className={classes.button}>
      {track.hash === currentTrack.hash && isPlaying ? (
        <PauseCircleOutline
          className={classes.icon}
          style={{ fontSize: 35 }}
        />
      ) : (
          <PlayCircleOutline
            className={classes.icon}
            style={{ fontSize: 35 }}
          />
        )}
    </IconButton>
  ) : null;
}

export default connect(
  ({ player }: AppStateInterface) => ({
    playingListId: get(player, 'list.id'),
    isPlaying: player.isPlaying,
    currentTrack: player.currentTrack
  }),
  {
    playList: playerActions.playList,
    pauseList: playerActions.pauseList,
    resumeList: playerActions.resumeList,
    pauseTrack: playerActions.pauseTrack,
    resumeTrack: playerActions.resumeTrack,
    playTrack: playerActions.playTrack
  }
)(PlayPause);