import React from "react"
import { PlayCircleOutline } from "@material-ui/icons"
import { useHistory } from "react-router"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"

import colors from "../utils/colors"
import Routes from "../routes"
import { SMALL_SCREEN_SIZE } from "../utils/constants"

export interface GenreInterface {
  name: string
  slug: string
}

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
  },
  transparentBackground: {
    opacity: 0.7,
    position: "absolute",
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: 'bold',
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
  genre: GenreInterface
  className?: string
  style?: object,
}

export default function GenreThumbnail(props: Props) {
  const styles = useStyles()
  const history = useHistory()

  const { genre } = props

  const goToGenrePage = () => {
    history.push(Routes.genre.detailPage(genre.slug))
  }

  return (
    <div className={props.className} style={props.style}>
      <div
        className={styles.imgContainer}
        style={{ backgroundImage: `url(/assets/images/genres.jpg)` }}
      >
        <div
          className={styles.transparentBackground}
          onClick={goToGenrePage}
        >
          <IconButton>
            <PlayCircleOutline className={styles.icon} />
          </IconButton>
          <h3 className={styles.title}>{genre.name}</h3>
        </div>
      </div>
    </div>
  )
}
