import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { Link } from "react-router-dom";

import TrackThumbnail from "./TrackThumbnail";
import { SMALL_SCREEN_SIZE } from "../utils/constants";

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 20
  },
  list: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto"
  },
  thumbnail: {
    width: 175,
    marginRight: 21,
    [theme.breakpoints.down(SMALL_SCREEN_SIZE)]: {
      width: 100,
      marginRight: 10,
    },
  },
  link: { color: "#fff", textDecoration: "none" },
  listHeader: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    paddingBottom: 3,
    paddingHorizontal: 0,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15
  },
  category: {
    margin: 0,
    fontSize: 16
  }
}));

export interface ArtistThumbnailData {
  stage_name: string,
  hash: string
};

export interface TrackWithArtistThumbnailData {
  title: string;
  hash: string;
  poster_url: string;
  artist: ArtistThumbnailData;
};

export const TrackScrollingList = (props: { tracks: TrackWithArtistThumbnailData[], category: string }) => {
  const { tracks, category } = props;
  const styles = useStyles();
  let domElement: any;

  const scroll = (dir: string) => {
    const distance = 400;
    if (dir === "left") {
      domElement.scrollLeft -= distance;
    } else {
      domElement.scrollLeft += distance;
    }

    console.log("clientWidth", domElement.clientWidth);
    console.log("offsetWidth", domElement.offsetWidth);
    console.log("scrollWidth", domElement.scrollWidth);
  };

  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>
        <Link to="/cat/konpa" className={styles.link}>
          <h2 className={styles.category}>{category}</h2>
        </Link>
        <div>
          <KeyboardArrowLeft onClick={() => scroll("left")} />
          &nbsp;
					<KeyboardArrowRight onClick={() => scroll("right")} />
        </div>
      </div>
      <div
        className={styles.list}
        ref={el => {
          domElement = el;
        }}
      >
        {tracks.map(track => (
          <TrackThumbnail key={track.hash} className={styles.thumbnail} track={track} />
        ))}
      </div>
    </div>
  );
};