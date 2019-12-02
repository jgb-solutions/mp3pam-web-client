import React from "react";
import {
  PlayCircleOutline,
  PauseCircleOutline
} from "@material-ui/icons";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

import colors from "../utils/colors";
import Routes from "../routes";
import { get } from "lodash-es";
import { SMALL_SCREEN_SIZE } from "../utils/constants";
import { TrackWithArtistThumbnailData, ArtistThumbnailData } from "./TrackScrollingList";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  imgContainer: {
    backgroundSize: "contain",
    cursor: "pointer",
    width: 175,
    height: 175,
    position: "relative",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down(SMALL_SCREEN_SIZE)]: {
      width: 100,
      height: 100,
    },
  },
  transparentBackground: {
    opacity: 0,
    position: "absolute",
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      opacity: 0.7
    }
  },
  icon: {
    fontSize: 75,
    color: colors.white,
    "&:hover": {
      fontSize: 80,
      opacity: 1
    }
  },
  title: {
    margin: 0,
    fontSize: 14,
    color: colors.white
  },
  details: {
    fontSize: 13,
    color: "#9d9d9d",
    marginTop: 5,
    marginBottom: 0
  },
  link: {
    color: colors.white,
    textDecoration: 'none',
  }
}));

type Props = {
  track: TrackWithArtistThumbnailData;
  className: string;
  isPlaying: boolean;
  trackHash: string;
};

const TrackThumbnail = (props: Props) => {
  const styles = useStyles();
  const history = useHistory();

  const { track, trackHash, isPlaying } = props;

  const goToTrackPage = () => {
    const route = Routes.track.detailPage(track.hash);
    history.push(route, { trackParam: track });
  };

  const goToArtistPage = () => {
    const route = Routes.artist.detailPage(track.artist.hash);
    history.push(route, { artistParam: track.artist });
  };

  return (
    <div className={props.className}>
      <div
        className={styles.imgContainer}
        style={{ backgroundImage: `url(${track.poster_url})` }}
      >
        <div
          className={styles.transparentBackground}
          onClick={goToTrackPage}
        >
          <IconButton>
            {(isPlaying && trackHash === track.hash) && (
              <PauseCircleOutline className={styles.icon} />
            )}
            {(!isPlaying || (isPlaying && trackHash !== track.hash)) && (
              <PlayCircleOutline className={styles.icon} />
            )}
          </IconButton>
        </div>
      </div>
      <h3 className={styles.title}>{track.title}</h3>
      <p className={styles.details}>
        by: <span onClick={goToArtistPage} className={styles.link}>
          {track.artist.stage_name}
        </span>
      </p>
    </div>
  );
};

export default connect(
  ({ player }: any) => ({
    trackHash: get(player, 'track.hash'),
    isPlaying: player.isPlaying
  })
)(TrackThumbnail);
