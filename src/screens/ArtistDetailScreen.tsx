import React, { useEffect, ReactNode } from "react"
import { darken, makeStyles } from "@material-ui/core/styles"
import { Link, useParams } from "react-router-dom"
import { get } from 'lodash'
import InfoIcon from '@material-ui/icons/Info'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import YouTubeIcon from '@material-ui/icons/YouTube'
import TelegramIcon from '@material-ui/icons/Telegram'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import EmailIcon from '@material-ui/icons/Email'
import ShareIcon from '@material-ui/icons/Share'
import FindReplaceIcon from '@material-ui/icons/FindReplace'
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
import Tabs, { TabItem } from "../components/Tabs"
import useArtistDetail from '../hooks/useArtistDetail'
import { Grid } from "@material-ui/core"
import { SMALL_SCREEN_SIZE, APP_NAME, DOMAIN, SEO_ARTIST_TYPE, TWITTER_HANDLE } from "../utils/constants"
import Spinner from "../components/Spinner"
import { ArtistScrollingList } from "../components/ArtistScrollingList"
import useRandomArtists from "../hooks/useRandomArtists"
import SEO from "../components/SEO"
import FourOrFour from "../components/FourOrFour"
import HeaderTitle from "../components/HeaderTitle"
import { CSSProperties } from "@material-ui/core/styles/withStyles"
import TrackThumbnail from "../components/TrackThumbnail"
import AlbumThumbnail from "../components/AlbumThumbnail"
import Image from "../components/Image"

export const LinkWrapper = (
  { children, url, color, style, target }: {
    children: ReactNode,
    url: string,
    color?: string,
    style?: CSSProperties,
    target?: string
  }) => (
    <a
      href={url}
      style={{ color: color || 'white', textDecoration: 'none', ...style }}
      target={target}>
      {children}
    </a>
  )

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

export default function ArtistDetailScreen() {
  const styles = useStyles()
  const params = useParams()
  const hash = get(params, 'hash')
  const { loading: randomLoading, data: randomArtistsData, fetchRandomdArtists } = useRandomArtists(hash)
  const randomArtists = get(randomArtistsData, 'randomArtists')

  const { data, loading, error } = useArtistDetail(hash)
  const artist = get(data, 'artist')

  useEffect(() => {
    if (data) {
      fetchRandomdArtists()
    }
    // eslint-disable-next-line
  }, [data])


  if (loading) return <Spinner.Full />


  if (error) {
    return (<h1>Error loading artist detail. Please reload page.</h1>)
  }

  const getTabs = () => {
    const url = window.location.href
    const title = `${artist.stage_name} on ${APP_NAME}`
    const hashtags = `${APP_NAME} music artist share`
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
                  <WhatsAppIcon style={{ fontSize: 48, cursor: 'pointer', color: colors.whatsapp }} />
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

    if (artist.bio) {
      tabs.push({
        icon: <InfoIcon />,
        label: "Biography",
        value: <p dangerouslySetInnerHTML={{ __html: artist.bio }} style={{ wordWrap: 'normal' }} />
      })
    }

    if (artist.tracks.length) {
      tabs.push({
        icon: <MusicNoteIcon />,
        label: "Tracks",
        value: (
          <>
            <br />
            <Grid container spacing={2}>
              {artist.tracks.map((track: { title: string, hash: string, poster_url: string }) => {
                const trackWithArtist = {
                  ...track,
                  artist: {
                    hash: artist.hash,
                    stage_name: artist.stage_name
                  }
                }

                return (
                  <Grid item xs={4} md={3} sm={4} key={track.hash}>
                    <TrackThumbnail track={trackWithArtist} />
                  </Grid>
                )
              })}
            </Grid>
          </>
        )
      })
    }

    if (artist.albums.length) {
      tabs.push({
        icon: <MusicNoteIcon />,
        label: "Albums",
        value: (
          <>
            <br />
            <Grid container spacing={2}>
              {artist.albums.map((album: { title: string, hash: string, cover_url: string }) => {
                const albumWithArtist = {
                  ...album,
                  artist: {
                    hash: artist.hash,
                    stage_name: artist.stage_name
                  }
                }

                return (
                  <Grid item xs={4} md={3} sm={4} key={album.hash}>
                    <AlbumThumbnail album={albumWithArtist} />
                  </Grid>
                )
              })}
            </Grid>
          </>
        )
      })
    }

    return tabs
  }

  return artist ? (
    <div className="react-transition flip-in-x-reverse">
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12} className={styles.imageContainer}>
          <Image
            src={artist.poster_url}
            alt={artist.stage_name}
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
            <h5 className={styles.listType}>Artist</h5>
            <h1 className={styles.listName}>{artist.stage_name}</h1>
            <Grid container spacing={2}>
              {artist.facebook_url && (
                <Grid item>
                  <LinkWrapper url={artist.facebook_url} target="_blank">
                    <FacebookIcon style={{ fontSize: 48, cursor: 'pointer', color: colors.facebook }} />
                  </LinkWrapper>
                </Grid>
              )}
              {artist.twitter_url && (
                <Grid item>
                  <LinkWrapper url={artist.twitter_url} target="_blank">
                    <TwitterIcon style={{ fontSize: 48, color: colors.twitter }} />
                  </LinkWrapper>
                </Grid>
              )}
              {artist.instagram_url && (
                <Grid item>
                  <LinkWrapper url={artist.instagram_url} target="_blank">
                    <InstagramIcon style={{ fontSize: 48, color: colors.instagram }} />
                  </LinkWrapper>
                </Grid>
              )}
              {artist.youtube_url && (
                <Grid item>
                  <LinkWrapper url={artist.youtube_url} target="_blank">
                    <YouTubeIcon style={{ fontSize: 48, color: colors.youtube }} />
                  </LinkWrapper>
                </Grid>
              )}
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
      {randomArtists ? (
        <ArtistScrollingList
          category="Other Artists You Might Like"
          artists={randomArtists}
          browse={Routes.browse.artists}
        />
      ) : null}

      {/* handling SEO */}
      <SEO
        title={`${artist.stage_name} on ${APP_NAME}`}
        url={`${DOMAIN}/artist/${artist.hash}`}
        description={`Listen to ${artist.stage_name} on ${APP_NAME}`}
        type={SEO_ARTIST_TYPE}
        image={artist.poster_url}
        artist={`${DOMAIN}/artist/${artist.hash}`}
      />
    </div>
  ) : (
      <>
        <HeaderTitle icon={<FindReplaceIcon />} text="OOPS! The Artist was not found." />
        <h3>
          Go to the <Link style={{ color: 'white' }} to={Routes.pages.home}>home page</Link>{' '}
          or
          {' '}
          <Link
            style={{ cursor: 'pointer', textDecoration: 'underline', color: colors.white }}
            to={Routes.browse.artists}>browse other artists.
          </Link>.
        </h3>
        <FourOrFour />
      </>
    )
}
