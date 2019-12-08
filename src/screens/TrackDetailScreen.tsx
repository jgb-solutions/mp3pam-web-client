import React from "react";
import { connect } from "react-redux";
import { darken, makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import { get } from 'lodash';
import InfoIcon from '@material-ui/icons/Info';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import ShareIcon from '@material-ui/icons/Share';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

import Routes from "../routes";
import colors from "../utils/colors";
import More from "../components/More";
import Tabs, { TabItem } from "../components/Tabs";
import useTrackDetail from '../hooks/useTrackDetail';
import Heart from "../components/Heart";
import Button from "../components/Button";
import ListInterface from "../interfaces/ListInterface";
import * as playerActions from "../store/actions/playerActions";
import AppStateInterface from "../interfaces/AppStateInterface";
import { Grid } from "@material-ui/core";
import { SMALL_SCREEN_SIZE } from "../utils/constants";
import Spinner from "../components/Spinner";
import { TrackScrollingList } from "../components/TrackScrollingList";
import useTracks from "../hooks/useTracks";

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
  playingListHash: string;
  currentTime: number;
};

const TrackDetailScreen = (props: Props) => {
  const styles = useStyles();
  const params = useParams();
  const hash = get(params, 'hash');
  const { loading: relatedLoading, data: relatedTracksData } = useTracks();
  const relatedTracks = get(relatedTracksData, 'tracks');

  const { data, loading, error } = useTrackDetail(hash);
  const track = get(data, 'track');

  const makeList = () => {
    const { hash, title, poster_url, artist, audio_url } = track;
    const list: ListInterface = {
      hash,
      sounds: [{
        hash,
        title,
        image: poster_url,
        author_name: artist.stage_name,
        author_hash: artist.hash,
        play_url: audio_url
      }]
    };
    console.log(list);
    return list;
  };

  const togglePlay = () => {
    if (props.isPlaying && props.playingListHash === track.hash) {
      props.pauseList();
    }

    if (!props.isPlaying && props.playingListHash === track.hash) {
      props.resumeList();
    }

    if (props.playingListHash !== track.hash) {
      props.playList(makeList());
    }
  };


  if (loading) return <Spinner.Full />;


  if (error) {
    return (<h1>There was an error fetching the list</h1>)
  }

  const getTabs = () => {
    const tabs: TabItem[] = [
      {
        icon: <ShareIcon />,
        label: "Share",
        value: (
          <>
            <br />
            {/* TODO URL */}
            <Grid container spacing={2}>
              <Grid item>
                <FacebookShareButton url="ksdf" quote="" hashtag="#">
                  <FacebookIcon size={48} />
                </FacebookShareButton>
              </Grid>
              <Grid item>
                <TwitterShareButton url="ksdf" title="" via="" hashtags={[""]}>
                  <TwitterIcon size={48} />
                </TwitterShareButton>
              </Grid>
              <Grid item>
                <WhatsappShareButton url="ksdf" title="" separator="">
                  <WhatsappIcon size={48} />
                </WhatsappShareButton>
              </Grid>
              <Grid item>
                <TelegramShareButton url="sdfs" title="">
                  <TelegramIcon size={48} />
                </TelegramShareButton>
              </Grid>
              <Grid item>
                <EmailShareButton url="ksdf">
                  <EmailIcon size={48} />
                </EmailShareButton>
              </Grid>
            </Grid>
          </>
        )
      }
    ];

    if (track.detail) {
      tabs.push({
        icon: <InfoIcon />,
        label: "Detail",
        value: <p dangerouslySetInnerHTML={{ __html: track.detail }} style={{ wordWrap: 'normal' }} />
      })
    }

    if (track.lyrics) {
      tabs.push({
        icon: <LineWeightIcon />,
        label: "Lyrics",
        value: <p dangerouslySetInnerHTML={{ __html: track.lyrics }} style={{ wordWrap: 'normal' }} />
      })
    }

    return tabs;
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
            <Grid className={styles.ctaButtons} container spacing={2}>
              <Grid item sm={4} xs={12}>
                <Button fullWidth style={{ maxWidth: 120 }} onClick={togglePlay}>
                  {(props.playingListHash !== track.hash) && "Play"}
                  {(props.isPlaying && props.playingListHash === track.hash) && "Pause"}
                  {(!props.isPlaying && props.playingListHash === track.hash) && "Resume"}
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

      {getTabs().length ? (
        <Tabs
          title="Detail Tabs"
          tabs={getTabs()}
        />
      ) : null}

      <br />
      <br />

      {relatedTracks && (
        <TrackScrollingList
          category="Related Tracks"
          tracks={relatedTracks.data}
          browse={Routes.browse.tracks}
        />
      )}
    </>
  ) : null;
}

export default connect(
  ({ player }: AppStateInterface) => ({
    playingListHash: get(player, 'list.hash'),
    isPlaying: player.isPlaying,
    currentTime: player.currentTime
  }),
  {
    playList: playerActions.playList,
    pauseList: playerActions.pauseList,
    resumeList: playerActions.resumeList
  }
)(TrackDetailScreen);
