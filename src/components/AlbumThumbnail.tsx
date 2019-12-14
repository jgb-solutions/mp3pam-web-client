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
import { AlbumThumbnailData } from "./AlbumScrollingList";
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
    color: colors.white,
    [theme.breakpoints.down(SMALL_SCREEN_SIZE)]: {
      fontSize: 12,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  details: {
    fontSize: 13,
    color: "#9d9d9d",
    marginTop: 5,
    marginBottom: 0,
    [theme.breakpoints.down(SMALL_SCREEN_SIZE)]: {
      fontSize: 11,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  link: {
    color: colors.white,
    textDecoration: 'none',
    cursor: 'pointer',
  }
}));

type Props = {
  album: AlbumThumbnailData;
  className?: string;
  isPlaying: boolean;
  albumHash: string;
};

const AlbumThumbnail = (props: Props) => {
  const styles = useStyles();
  const history = useHistory();

  const { album, albumHash, isPlaying } = props;

  const goToAlbumPage = () => {
    const route = Routes.album.detailPage(album.hash);
    history.push(route, { albumParam: album });
  };

  const goToArtistPage = () => {
    const route = Routes.artist.detailPage(album.artist.hash);
    history.push(route, { albumParam: album });
  };

  return (
    <div className={props.className}>
      <div
        className={styles.imgContainer}
        style={{ backgroundImage: `url(${album.cover_url})` }}
      >
        <div
          className={styles.transparentBackground}
          onClick={goToAlbumPage}
        >
          <IconButton>
            {(isPlaying && albumHash === album.hash) && (
              <PauseCircleOutline className={styles.icon} />
            )}
            {(!isPlaying || (isPlaying && albumHash !== album.hash)) && (
              <PlayCircleOutline className={styles.icon} />
            )}
          </IconButton>
        </div>
      </div>
      <h3 className={styles.title}>{album.title}</h3>
      <p className={styles.details}>
        {/* by: */}
        <span onClick={goToArtistPage} className={styles.link}>
          {album.artist.stage_name}
        </span>
      </p>
    </div>
  );
};

export default connect(
  ({ player }: any) => ({
    albumHash: get(player, 'album.hash'),
    isPlaying: player.isPlaying
  })
)(AlbumThumbnail);
