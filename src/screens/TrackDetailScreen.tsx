import React from "react";
import { connect } from "react-redux";
import { darken, makeStyles } from "@material-ui/core/styles";
import { Link, useRouteMatch, useLocation, useParams } from "react-router-dom";
import { get } from 'lodash';
import InfoIcon from '@material-ui/icons/Info';
import LineWeightIcon from '@material-ui/icons/LineWeight';

import Routes from "../routes";
import colors from "../utils/colors";
import More from "../components/More";
import useTrackDetail from '../hooks/useTrackDetail';
import Heart from "../components/Heart";
import Button from "../components/Button";
import ListTable from '../components/ListTable';
import ListInterface from "../interfaces/ListInterface";
import * as playerActions from "../store/actions/playerActions";
import AppStateInterface from "../interfaces/AppStateInterface";
import { Grid } from "@material-ui/core";
import { SMALL_SCREEN_SIZE } from "../utils/constants";
import Spinner from "../components/Spinner";
import HeaderTitle from "../components/HeaderTitle";

const useStyles = makeStyles(theme => ({
  row: {
    display: "flex",
    flexDirection: "row"
  },
  imageContainer: {
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 'auto',
    maxWidth: "100%",
  },
  listByAuthor: {
    fontSize: 12
  },
  listBy: {
    color: darken(colors.white, 0.5)
  },
  listAuthor: {
    textDecoration: "none",
    color: colors.white,
    "&:hover": {
      textDecoration: "underline"
    },
    "&:link": {
      textDecoration: "none",
      color: "white"
    }
  },
  detailsWrapper: {
    [theme.breakpoints.up(SMALL_SCREEN_SIZE)]: {
      position: 'relative',
    },
  },
  listDetails: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "flex-end",
    [theme.breakpoints.up(SMALL_SCREEN_SIZE)]: {
      position: 'absolute',
      bottom: 0,
    },
    "& > *": {
      padding: 0,
      margin: 0
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  listType: {
    fontSize: 12,
    fontWeight: 400,
    textTransform: "uppercase"
  },
  listName: {
    fontSize: 48,
    fontWeight: "bold",
    [theme.breakpoints.down('xs')]: {
      fontSize: 32,
    },
  },
  ctaButtons: {
    marginTop: 10,
  },
  hearMore: {
    alignSelf: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
    },
  }
}));

type Props = {
  playList(list: ListInterface): void;
  pauseList(): void;
  resumeList(): void;
  isPlaying: boolean;
  playingListId: string;
  currentTime: number;
};

const TrackDetailScreen = (props: Props) => {
  const styles = useStyles();
  const params = useParams();
  const hash = get(params, 'hash');

  const { data, loading, error } = useTrackDetail(hash);
  const track = get(data, 'track');

  const togglePlay = (list: ListInterface) => {
    if (props.isPlaying && props.playingListId === hash) {
      props.pauseList();
    }

    if (!props.isPlaying && props.playingListId === hash) {
      props.resumeList();
    }

    if (props.playingListId !== hash) {
      props.playList(list);
    }
  };


  if (loading) return <Spinner.Full />;


  if (error) {
    return (<h1>There was an error fetching the list</h1>)
  }

  return track ? (
    <>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12} className={styles.imageContainer}>
          <img src={track.poster_url} alt={track.title} className={styles.image} />
        </Grid>
        <Grid item sm={8} xs={12} className={styles.detailsWrapper}>
          <div className={styles.listDetails}>
            <h5 className={styles.listType}>Track</h5>
            <h1 className={styles.listName}>{track.title}</h1>
            <p className={styles.listByAuthor}>
              <span className={styles.listBy}>By </span>
              <Link
                to={Routes.artist.detailPage(track.artist.hash)}
                className={styles.listAuthor}
              >
                {track.artist.stage_name}
              </Link>
            </p>
            <Grid className={styles.ctaButtons} container>
              <Grid item sm={4} xs={12}>
                <Button onClick={() => {
                  // togglePlay(list)
                }}>
                  {(props.playingListId !== hash) && "Play"}
                  {(props.isPlaying && props.playingListId === hash) && "Pause"}
                  {(!props.isPlaying && props.playingListId === hash) && "Resume"}
                  {/* todo // using props.currentTime > 0  to display rsesume or replay */}
                </Button>
              </Grid>
              <Grid item sm={8} xs={12} className={styles.hearMore}>
                <Heart border />
                &nbsp; &nbsp;
								<More border />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <br />
      {/* TODO: Related Tracks */}
      <HeaderTitle icon={<InfoIcon />} text="Detail" />
      <p dangerouslySetInnerHTML={{ __html: track.detail }} style={{ whiteSpace: 'pre' }} />

      <HeaderTitle icon={<LineWeightIcon />} text="Lyrics" />
      <p dangerouslySetInnerHTML={{ __html: track.lyrics }} style={{ whiteSpace: 'pre' }} />
    </>
  ) : null;
}

export default connect(
  ({ player }: AppStateInterface) => ({
    playingListId: get(player, 'hash'),
    isPlaying: player.isPlaying,
    currentTime: player.currentTime
  }),
  {
    playList: playerActions.playList,
    pauseList: playerActions.pauseList,
    resumeList: playerActions.resumeList
  }
)(TrackDetailScreen);
