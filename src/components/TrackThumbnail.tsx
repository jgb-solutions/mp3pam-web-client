import React from "react"
import {
  PlayCircleOutline,
  PauseCircleOutline
} from "@material-ui/icons"
import { useHistory } from "react-router"
import { connect } from "react-redux"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import colors from "../utils/colors"
import Routes from "../routes"
import { get } from "lodash-es"
import { SMALL_SCREEN_SIZE } from "../utils/constants"
import { TrackWithArtistThumbnailData } from "./TrackScrollingList"
import AppStateInterface from "../interfaces/AppStateInterface"
import Image from "./Image"

const useStyles = makeStyles(theme => ({
  imgContainer: {
    backgroundSize: "contain",
    backgroundRepeat: 'no-repeat',
    cursor: "pointer",
    width: 175,
    height: 175,
    maxWidth: '100%',
    maxHeight: '100%',
    position: "relative",
    marginBottom: 10,
    // display: "flex",
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
}))

type Props = {
  track: TrackWithArtistThumbnailData
  className?: string
  style?: object,
  isPlaying: boolean
  listId: string
}

const TrackThumbnail = (props: Props) => {
  const styles = useStyles()
  const history = useHistory()

  const { track, listId, isPlaying } = props

  const goToTrackPage = () => {
    const route = Routes.track.detailPage(track.hash)
    history.push(route, { hash: track.hash })
  }

  const goToArtistPage = () => {
    const route = Routes.artist.detailPage(track.artist.hash)
    history.push(route, { hash: track.artist.hash })
  }

  return (
    <div className={props.className} style={props.style}>
      <div
        className={styles.imgContainer}
        style={{
          backgroundImage: `url(${Image.phoneCdnUrl(track.poster_url, {
            ulb: true,
            lb: {
              width: 250,
              height: 250
            }
          })})`
        }}
      >
        <div
          className={styles.transparentBackground}
          onClick={goToTrackPage}
        >
          <IconButton>
            {(isPlaying && listId === track.hash) && (
              <PauseCircleOutline className={styles.icon} />
            )}
            {(!isPlaying || (isPlaying && listId !== track.hash)) && (
              <PlayCircleOutline className={styles.icon} />
            )}
          </IconButton>
        </div>
      </div>
      <h3 className={styles.title}>{track.title}</h3>
      <p className={styles.details}>
        {/* by: */}
        <span onClick={goToArtistPage} className={styles.link}>
          {track.artist.stage_name}
        </span>
      </p>
    </div>
  )
}

export default connect(
  ({ player }: AppStateInterface) => ({
    listId: get(player, 'list.id'),
    isPlaying: player.isPlaying
  })
)(TrackThumbnail)
