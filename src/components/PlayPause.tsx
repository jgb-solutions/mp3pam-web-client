import {
  PlayCircleOutline,
  PauseCircleOutline,
} from "@material-ui/icons";
import React, { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import {
	Theme,
	WithStyles,
	withStyles,
	createStyles,
} from "@material-ui/core/styles";
import { connect } from 'react-redux';

import colors from "../utils/colors";
import * as playerActions from "../store/actions/playerActions";
import AppStateInterface from "../interfaces/AppStateInterface";
import ListInterface from "../interfaces/ListInterface";

const styles = (theme: Theme) =>
	createStyles({
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

interface Props extends WithStyles<typeof styles> {
  border?: boolean;
  pauseList(): void;
  resumeList(): void;
  isPlaying: boolean;
  playingListId: string;
  playList(list: ListInterface): void;
}

function PlayPause(props: Props) {
  const { classes } = props;

  const togglePlay = (list: any) => {
		if (props.isPlaying &&  props.playingListId === list.id) {
			props.pauseList();
		}

		if (!props.isPlaying && props.playingListId === list.id) {
			props.resumeList();
		}

		if (props.playingListId !== list.id) {
			props.playList(list);
		}
  };

  return (
    <>
      <IconButton onClick={togglePlay} className={classes.button}>
          {props.isPlaying && (
            <PauseCircleOutline
              className={classes.icon}
              style={{ fontSize: 35 }}
            />
          )}
          {!props.isPlaying && (
            <PlayCircleOutline
              className={classes.icon}
              style={{ fontSize: 35 }}
            />
          )}
        </IconButton>
    </>
  )
}

export default connect(
	({ player }: AppStateInterface) => ({
		playingListId: player.list.id,
		isPlaying: player.isPlaying,
		currentTime: player.currentTime
	}),
	{
		playList: playerActions.playList,
		pauseList: playerActions.pauseList,
		resumeList: playerActions.resumeList
	}
)(withStyles(styles)(PlayPause));