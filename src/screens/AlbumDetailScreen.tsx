import React, { useEffect } from "react"
import { connect } from "react-redux"
import { darken, makeStyles } from "@material-ui/core/styles"
import { Link, useParams, useHistory } from "react-router-dom"
import { get } from 'lodash'
import InfoIcon from '@material-ui/icons/Info'
import ShareIcon from '@material-ui/icons/Share'
import FindReplaceIcon from '@material-ui/icons/FindReplace'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import TelegramIcon from '@material-ui/icons/Telegram'
import WhatsappIcon from '@material-ui/icons/WhatsApp'
import EmailIcon from '@material-ui/icons/Email'
import MusicNoteIcon from '@material-ui/icons/MusicNote'

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
import AlbumTracksTable from "../components/AlbumTracksTable"
import useAlbumDetail from '../hooks/useAlbumDetail'
import Button from "../components/Button"
import ListInterface, { SoundInterface } from "../interfaces/ListInterface"
import * as playerActions from "../store/actions/playerActions"
import AppStateInterface from "../interfaces/AppStateInterface"
import { Grid, Hidden } from "@material-ui/core"
import { SMALL_SCREEN_SIZE, APP_NAME, DOMAIN, SEO_ALBUM_TYPE, TWITTER_HANDLE } from "../utils/constants"
import Spinner from "../components/Spinner"
import { AlbumScrollingList } from "../components/AlbumScrollingList"
import useRandomAlbums from "../hooks/useRandomAlbums"
import SEO from "../components/SEO"
import FourOrFour from "../components/FourOrFour"
import HeaderTitle from "../components/HeaderTitle"
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
  playList(list: ListInterface, sound?: SoundInterface): void
  pauseList(): void
  resumeList(): void
  playNext(soundList: SoundInterface[]): void
  addToQueue(soundList: SoundInterface[]): void
  isPlaying: boolean
  playingListHash: string
  currentTime: number
}

const AlbumDetailScreen = (props: Props) => {
  const styles = useStyles()
  const params = useParams()
  const history = useHistory()
  const hash = get(params, 'hash')
  const { loading: randomLoading, data: randomAlbumsData, fetchRandomAlbums } = useRandomAlbums(hash)
  const randomAlbums = get(randomAlbumsData, 'randomAlbums')

  const { data, loading, error } = useAlbumDetail(hash)
  const album = get(data, 'album')

  const makeList = () => {
    const { hash } = album

    const list: ListInterface = {
      hash,
      sounds: makeSoundList()
    }

    return list
  }

  const makeSoundList = () => {
    return album.tracks.map(({ hash, title, posterUrl, audio_url }) => ({
      hash,
      title,
      image: posterUrl,
      authorName: album.artist.stage_name,
      authorHash: album.artist.hash,
      playUrl: audio_url,
      type: 'track',
    }))
  }

  useEffect(() => {
    if (data) {
      fetchRandomAlbums()
    }
    // eslint-disable-next-line
  }, [data])

  const togglePlay = () => {
    if (props.isPlaying && props.playingListHash === album.hash) {
      props.pauseList()
    }

    if (!props.isPlaying && props.playingListHash === album.hash) {
      props.resumeList()
    }

    if (props.playingListHash !== album.hash) {
      props.playList(makeList())
    }
  }


  if (loading) return <Spinner.Full />


  if (error) {
    return (<h1>Error loading album detail. Please reload page.</h1>)
  }

  const getTabs = () => {
    const url = window.location.href
    const title = `Listen to ${album.title} by ${album.artist.stage_name}`
    const hashtags = `${APP_NAME} music album share`
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

    if (album.detail) {
      tabs.push({
        icon: <InfoIcon />,
        label: "Detail",
        value: <p dangerouslySetInnerHTML={{ __html: album.detail }} style={{ wordWrap: 'normal' }} />
      })
    }

    if (album.tracks.length) {
      tabs.push({
        icon: <MusicNoteIcon />,
        label: "Tracks",
        value: <AlbumTracksTable album={album} list={makeList()} />
      })
    }

    return tabs
  }

  const getMoreOptions = () => {
    let options = [
      {
        name: 'Play Next',
        method: () => props.playNext(makeSoundList())
      },
      {
        name: 'Go To Artist',
        method: () => {
          history.push(Routes.artist.detailPage(album.artist.hash))
        }
      },
      // { name: 'Remove from your Liked Albums', method: () => { } },
      // { name: 'Add To Playlist', method: () => { } },
    ]

    options.push({
      name: 'Add To Queue',
      method: () => props.addToQueue(makeSoundList())
    })

    return options
  }

  return album ? (
    <div className="react-transition flip-in-x-reverse">
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12} className={styles.imageContainer}>
          <Image
            src={album.coverUrl}
            alt={album.title}
            className={styles.image}
            photon={{
              ulb: true,
              lb: {
                width: 250,
                height: 250
              }
            }}
          />
        </Grid>
        <Grid item sm={8} xs={12} className={styles.detailsWrapper}>
          <div className={styles.listDetails}>
            <h5 className={styles.listType}>Album</h5>
            <h1 className={styles.listName}>{album.title}</h1>
            <p className={styles.listByAuthor} style={{ marginBottom: 5 }}>
              <span className={styles.listBy}>By </span>
              <Link
                to={Routes.artist.detailPage(album.artist.hash)}
                className={styles.listAuthor}
              >
                {album.artist.stage_name}
              </Link>
              <br />
              <span className={styles.listBy}>Released In </span>
              <span className={styles.listAuthor} style={{ textDecoration: 'none' }}>
                {album.release_year}
              </span>
            </p>
            <Grid className={styles.ctaButtons} container spacing={2}>
              <Grid item xs={2} implementation="css" smUp component={Hidden} />
              <Grid item >
                <Button fullWidth style={{ width: 100 }} onClick={togglePlay}>
                  {(props.playingListHash !== album.hash) && "Play"}
                  {(props.isPlaying && props.playingListHash === album.hash) && "Pause"}
                  {(!props.isPlaying && props.playingListHash === album.hash) && "Resume"}
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

      {randomLoading && <Spinner.Full />}
      {randomAlbums ? (
        <AlbumScrollingList
          category="Other Albums Your Might Like"
          albums={randomAlbums}
          browse={Routes.browse.albums}
        />
      ) : null}
      {/* handling SEO */}
      <SEO
        title={`${album.title} (album) by ${album.artist.stage_name}`}
        url={`${DOMAIN}/album/${album.hash}`}
        description={`Listen to ${album.title} by ${album.artist.stage_name} on ${APP_NAME}`}
        type={SEO_ALBUM_TYPE}
        image={album.coverUrl}
        artist={`${DOMAIN}/artist/${album.artist.hash}`}
      />
    </div>
  ) : (
      <>
        <HeaderTitle icon={<FindReplaceIcon />} text="OOPS! The Album was not found." />
        <h3>
          Go to the <Link style={{ color: 'white' }} to={Routes.pages.home}>home page</Link>{' '}
          or
          {' '}
          <Link
            style={{ cursor: 'pointer', textDecoration: 'underline', color: colors.white }}
            to={Routes.browse.albums}>browse other albums.
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
)(AlbumDetailScreen)
