import React, { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux"
import { darken, makeStyles } from "@material-ui/core/styles"
import { Link, useParams, useHistory } from "react-router-dom"
import { get } from 'lodash'
import InfoIcon from '@material-ui/icons/Info'
import LineWeightIcon from '@material-ui/icons/LineWeight'
import GetAppIcon from '@material-ui/icons/GetApp'
import ShareIcon from '@material-ui/icons/Share'
import FindReplaceIcon from '@material-ui/icons/FindReplace'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import TelegramIcon from '@material-ui/icons/Telegram'
import WhatsappIcon from '@material-ui/icons/WhatsApp'
import EmailIcon from '@material-ui/icons/Email'
import HeadsetIcon from '@material-ui/icons/Headset'

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share'

import Routes from "../routes"
import colors from "../utils/colors"
import More from "../components/More"
import Tabs, { TabItem } from "../components/Tabs"
import useTrackDetail from '../hooks/useTrackDetail'
import Button from "../components/Button"
import ListInterface, { SoundInterface } from "../interfaces/ListInterface"
import * as playerActions from "../store/actions/playerActions"
import AppStateInterface from "../interfaces/AppStateInterface"
import { Grid, Hidden } from "@material-ui/core"
import { SMALL_SCREEN_SIZE, APP_NAME, DOMAIN, SEO_TRACK_TYPE, TWITTER_HANDLE } from "../utils/constants"
import Spinner from "../components/Spinner"
import { TrackScrollingList } from "../components/TrackScrollingList"
import useRelatedTracks from "../hooks/useRelatedTracks"
import SEO from "../components/SEO"
import FourOrFour from "../components/FourOrFour"
import HeaderTitle from "../components/HeaderTitle"
import { AddTrackToPlaylist } from "./manage/PlaylistEditScreen"
import Image from "../components/Image"

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
    fontSize: 14,
    fontWeight: 'bold',
  },
  listBy: {
    color: darken(colors.white, 0.5),
    fontSize: 12
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
      bottom: 4,
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
    fontSize: 36,
    fontWeight: "bold",
    [theme.breakpoints.down('xs')]: {
      fontSize: 32,
    },
  },
  ctaButtons: {
    marginTop: 10,
  },
}))

type Props = {
  playList(list: ListInterface): void
  pauseList(): void
  resumeList(): void
  playNext(soundList: SoundInterface[]): void
  addToQueue(soundList: SoundInterface[]): void
  isPlaying: boolean
  playingListHash: string
  currentTime: number
}

const TrackDetailScreen = (props: Props) => {
  const styles = useStyles()
  const params = useParams()
  const history = useHistory()
  const hash = get(params, 'hash')
  const [openAddTrackToPlaylistPopup, setOpenAddTrackToPlaylistPopup] = useState(false)
  const { loading: relatedLoading, data: relatedTracksData, fetchRelatedTracks } = useRelatedTracks(hash)
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser)
  const relatedTracks = get(relatedTracksData, 'relatedTracks')

  const { data, loading, error } = useTrackDetail(hash)
  const track = get(data, 'track')

  const makeList = () => {
    const { hash } = track

    const list: ListInterface = {
      hash,
      sounds: makeSoundList()
    }

    return list
  }

  const makeSoundList = () => {
    const { hash, title, posterUrl, artist, audio_url } = track

    return [{
      hash,
      title,
      image: posterUrl,
      authorName: artist.stage_name,
      authorHash: artist.hash,
      playUrl: audio_url,
      type: 'track',
    }]
  }

  useEffect(() => {
    if (data) {
      fetchRelatedTracks()
    }
    // eslint-disable-next-line
  }, [data])

  const togglePlay = () => {
    if (props.isPlaying && props.playingListHash === track.hash) {
      props.pauseList()
    }

    if (!props.isPlaying && props.playingListHash === track.hash) {
      props.resumeList()
    }

    if (props.playingListHash !== track.hash) {
      props.playList(makeList())
    }
  }


  if (loading) return <Spinner.Full />


  if (error) {
    return (<h1>Error loading track detail. Please reload page.</h1>)
  }

  const getTabs = () => {
    const url = window.location.href
    const title = `Listen to ${track.title} by ${track.artist.stage_name}`
    const hashtags = `${APP_NAME} music track share`
    const tabs: TabItem[] = [
      {
        icon: <ShareIcon />,
        label: "Share",
        value: (
          <>
            <br />
            <Grid container spacing={2}>
              <Grid item>
                <FacebookShareButton
                  url={url}
                  quote={title}
                  hashtag={hashtags.split(' ').join(' #')}>
                  <FacebookIcon style={{ fontSize: 48, cursor: 'pointer', color: colors.facebook }} />
                </FacebookShareButton>
              </Grid>
              <Grid item>
                <TwitterShareButton
                  url={url}
                  title={title}
                  via={TWITTER_HANDLE}
                  hashtags={hashtags.split(' ')}>
                  <TwitterIcon style={{ fontSize: 48, cursor: 'pointer', color: colors.twitter }} />
                </TwitterShareButton>
              </Grid>
              <Grid item>
                <WhatsappShareButton url={url} title={title}>
                  <WhatsappIcon style={{ fontSize: 48, cursor: 'pointer', color: colors.whatsapp }} />
                </WhatsappShareButton>
              </Grid>
              <Grid item>
                <TelegramShareButton url={url} title={title}>
                  <TelegramIcon style={{ fontSize: 48, cursor: 'pointer', color: colors.telegram }} />
                </TelegramShareButton>
              </Grid>
              <Grid item>
                <EmailShareButton url={url} subject={title} body={title}>
                  <EmailIcon style={{ fontSize: 48, cursor: 'pointer' }} />
                </EmailShareButton>
              </Grid>
            </Grid>
          </>
        )
      }
    ]

    if (track.allowDownload) {
      tabs.push({
        icon: <GetAppIcon />,
        label: "Download",
        value: (
          <>
            <p>
              File Size: {track.audio_file_size}
            </p>
            <Button
              size="large"
              style={{ minWidth: 150 }}
              onClick={() => history.push(Routes.download.trackPage(track.hash))}>
              Download
            </Button>
          </>
        )
      })
    }

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

    return tabs
  }

  const handleAddTrackToPlaylist = () => {
    setOpenAddTrackToPlaylistPopup(true)
  }

  const getMoreOptions = () => {
    let options = [
      {
        name: 'Play Next',
        method: () => props.playNext(makeSoundList())
      }
    ]

    if (currentUser.loggedIn) {
      options.push({
        name: 'Add To Playlist',
        method: handleAddTrackToPlaylist
      })
    }

    options.push({
      name: 'Go To Artist',
      method: () => {
        history.push(Routes.artist.detailPage(track.artist.hash))
      }
    })

    if (track.album) {
      options.push({
        name: 'Go To Album',
        method: () => {
          history.push(Routes.album.detailPage(track.album.hash))
        }
      })
    }

    options.push({
      name: 'Add To Queue',
      method: () => props.addToQueue(makeSoundList())
    })

    return options
  }

  return track ? (
    <div className="react-transition flip-in-x-reverse">
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12} className={styles.imageContainer}>
          <Image
            src={track.posterUrl}
            alt={track.title}
            className={styles.image}
            photon={{
              ulb: true,
              lb: {
                width: 250,
                height: 250
              }
            }} />
        </Grid>
        <Grid item sm={8} xs={12} className={styles.detailsWrapper}>
          <div className={styles.listDetails}>
            <h5 className={styles.listType}>Track</h5>
            <h1 className={styles.listName}>{track.title}</h1>
            <p className={styles.listByAuthor} style={{ marginBottom: 5 }}>
              <span className={styles.listBy}>By </span>
              <Link
                to={Routes.artist.detailPage(track.artist.hash)}
                className={styles.listAuthor}
              >
                {track.artist.stage_name}
              </Link>

              <span className={styles.listBy}>, In </span>
              <Link
                to={Routes.genre.detailPage(track.genre.slug)}
                className={styles.listAuthor}
              >
                {track.genre.name}
              </Link>
            </p>
            <p className={styles.listByAuthor}>
              <HeadsetIcon className={styles.listBy} /> {' '}
              <span className={styles.listAuthor}>
                {track.playCount}
              </span>
              &nbsp;&nbsp;_&nbsp;&nbsp;
              <GetAppIcon className={styles.listBy} /> {' '}
              <span className={styles.listAuthor}>
                {track.downloadCount}
              </span>
            </p>
            <Grid className={styles.ctaButtons} container spacing={2}>
              <Grid item xs={2} implementation="css" smUp component={Hidden} />
              <Grid item>
                <Button style={{ width: 100 }} onClick={togglePlay}>
                  {(props.playingListHash !== track.hash) && "Play"}
                  {(props.isPlaying && props.playingListHash === track.hash) && "Pause"}
                  {(!props.isPlaying && props.playingListHash === track.hash) && "Resume"}
                  {/* todo // using props.currentTime > 0  to display rsesume or replay */}
                </Button>
              </Grid>
              <Grid item>
                {/* <Heart border />
                &nbsp; &nbsp; */}
                <More border options={getMoreOptions()} />
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

      {relatedLoading && <Spinner.Full />}
      {relatedTracks ? (
        <TrackScrollingList
          category="Related Tracks"
          tracks={relatedTracks}
          browse={Routes.browse.tracks}
        />
      ) : null}
      {/* handling SEO */}
      <SEO
        title={`${track.title} by ${track.artist.stage_name}`}
        url={`${DOMAIN}/track/${track.hash}`}
        description={`Listen to ${track.title} by ${track.artist.stage_name} on ${APP_NAME}`}
        type={SEO_TRACK_TYPE}
        image={track.posterUrl}
        artist={`${DOMAIN}/artist/${track.artist.hash}`}
      />

      {openAddTrackToPlaylistPopup && (
        <AddTrackToPlaylist
          trackHash={track.hash}
          onRequestClose={() => {
            setOpenAddTrackToPlaylistPopup(false)
          }}
        />
      )}
    </div>
  ) : (
      <>
        <HeaderTitle icon={<FindReplaceIcon />} text="OOPS! The Track was not found." />
        <h3>
          Go to the <Link style={{ color: 'white' }} to={Routes.pages.home}>home page</Link>{' '}
          or
          {' '}
          <Link
            style={{ cursor: 'pointer', textDecoration: 'underline', color: colors.white }}
            to={Routes.browse.tracks}>browse other tracks.
          </Link>.
        </h3>
        <FourOrFour />
      </>
    )
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
    resumeList: playerActions.resumeList,
    playNext: playerActions.playNext,
    addToQueue: playerActions.addToQueue,
  }
)(TrackDetailScreen)
