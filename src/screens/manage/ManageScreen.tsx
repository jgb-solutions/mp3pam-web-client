import React from "react"
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import { Link } from "react-router-dom"
import { get } from "lodash-es"
import { makeStyles } from "@material-ui/core/styles"

import Spinner from '../../components/Spinner'
import useManage from "../../hooks/useManage"
import HeaderTitle from "../../components/HeaderTitle"
import { TrackScrollingList } from "../../components/TrackScrollingList"
import { ArtistScrollingList } from "../../components/ArtistScrollingList"
import { AlbumScrollingList } from "../../components/AlbumScrollingList"
import Routes from "../../routes"

const useStyles = makeStyles(theme => ({
  link: { color: "#fff", fontWeight: 'bold' },
}))

export default function ManageScreen() {
  const styles = useStyles()
  const { loading, error, data } = useManage()
  const latestTracks = get(data, 'me.latestTracks')
  const latestArtists = get(data, 'me.latestArtists')
  const latestAlbums = get(data, 'me.latestAlbums')

  if (loading) return <Spinner.Full />

  if (error) return <h1>Error Loading the homepage  Please refresh the page.</h1>

  return (
    <>
      <HeaderTitle icon={<GroupWorkIcon />} text="Your Library" />

      {latestTracks ? (
        <TrackScrollingList
          category="Your Latest Tracks"
          tracks={latestTracks.data}
          browse={Routes.user.manage.tracks}
        />
      ) : (
          <h3>You have no tracks yet. <Link className={styles.link} to={Routes.user.create.track}>Add a new track</Link>.</h3>
        )}

      {latestArtists ? (
        <ArtistScrollingList
          category="Your Latest Artists"
          artists={latestArtists.data}
          browse={Routes.user.manage.artists}
        />
      ) : (
          <h3>You have no albums yet. <Link className={styles.link} to={Routes.user.create.album}>Add a new track</Link>.</h3>
        )}

      {latestAlbums ? (
        <AlbumScrollingList
          category="Your Latest Albums"
          albums={latestAlbums.data}
          browse={Routes.user.manage.albums}
        />
      ) : (
          <h3>You have no artists yet. <Link className={styles.link} to={Routes.user.create.artist}>Add a new artist</Link>.</h3>
        )}
    </>
  )
}
