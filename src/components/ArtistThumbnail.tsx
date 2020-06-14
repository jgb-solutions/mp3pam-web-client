import React from "react"
import { PlayCircleOutline } from "@material-ui/icons"
import { useHistory } from "react-router"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import colors from "../utils/colors"
import Routes from "../routes"
import { SMALL_SCREEN_SIZE } from "../utils/constants"
import { ArtistThumbnailData } from "./ArtistScrollingList"
import Image from "./Image"

const useStyles = makeStyles(theme => ({
  imgContainer: {
    // minWidth: 100,
    // minHeight: 100,
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
  artist: ArtistThumbnailData
  className?: string
  style?: object,
}

export default function ArtistThumbnail(props: Props) {
  const styles = useStyles()
  const history = useHistory()

  const { artist } = props

  const goToArtistPage = () => {
    const route = Routes.artist.detailPage(artist.hash)
    history.push(route, { hash: artist.hash })
  }

  return (
    <div className={props.className} style={props.style}>
      <div
        className={styles.imgContainer}
        style={{
          backgroundImage: `url(${Image.phoneCdnUrl(artist.posterUrl, {
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
          onClick={goToArtistPage}
        >
          <IconButton>
            <PlayCircleOutline className={styles.icon} />
          </IconButton>
        </div>
      </div>
      <h3 className={styles.title}>{artist.stageName}</h3>
    </div>
  )
}
