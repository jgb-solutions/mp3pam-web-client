import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons"
import { Link } from "react-router-dom"

import { SMALL_SCREEN_SIZE } from "../utils/constants"
import AlbumThumbnail from "./AlbumThumbnail"

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 30
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
}))

export interface AlbumThumbnailData {
  title: string,
  hash: string,
  cover_url: string,
  artist: {
    hash: string
    stage_name: string
  }
}

export const AlbumScrollingList = (props: { albums: AlbumThumbnailData[], category: string, browse: string }) => {
  const { albums, category, browse } = props
  const styles = useStyles()
  let domElement: any

  const scroll = (dir: string) => {
    const distance = 400
    if (dir === "left") {
      domElement.scrollLeft -= distance
    } else {
      domElement.scrollLeft += distance
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>
        <Link to={browse} className={styles.link}>
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
          domElement = el
        }}
      >
        {albums.map(album => (
          <AlbumThumbnail key={album.hash} className={styles.thumbnail} album={album} />
        ))}
      </div>
    </div>
  )
}