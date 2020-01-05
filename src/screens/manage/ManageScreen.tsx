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
import { PlaylistScrollingList } from "../../components/PlaylistScrollingList"
import SEO from "../../components/SEO"

const useStyles = makeStyles(theme => ({
  link: { color: "#fff", fontWeight: 'bold' },
}))

export default function ManageScreen() {
  const styles = useStyles()
  const { loading, error, data } = useManage()
  const latestTracks = get(data, 'me.latestTracks.data')
  const latestArtists = get(data, 'me.latestArtists.data')
  const latestAlbums = get(data, 'me.latestAlbums.data')
  const latestPlaylists = get(data, 'me.latestPlaylists.data')

  if (loading) return <Spinner.Full />

  if (error) return <h1>Error Loading the homepage  Please refresh the page.</h1>

  return (
    <>
      <HeaderTitle icon={<GroupWorkIcon />} text="Your Library" />
      <SEO title={`Your Library`} />

      {latestTracks.length ? (
        <TrackScrollingList
          category="Your Latest Tracks"
          tracks={latestTracks}
          browse={Routes.user.manage.tracks}
        />
      ) : (
          <h3>You have no tracks yet. <Link className={styles.link} to={Routes.user.create.track}>Add a new track</Link>.</h3>
        )}

      {latestPlaylists.length ? (
        <PlaylistScrollingList
          category="Your Latest Playlists"
          playlists={latestPlaylists}
          browse={Routes.user.manage.playlists}
        />
      ) : (
          <h3>You have no playlists yet. <Link className={styles.link} to={Routes.user.create.playlist}>Create a new playlist</Link>.</h3>
        )
      }

      {latestArtists.length ? (
        <ArtistScrollingList
          category="Your Latest Artists"
          artists={latestArtists}
          browse={Routes.user.manage.artists}
        />
      ) : (
          <h3>You have no artists yet. <Link className={styles.link} to={Routes.user.create.artist}>Add a new artist</Link>.</h3>
        )}

      {latestAlbums.length ? (
        <AlbumScrollingList
          category="Your Latest Albums"
          albums={latestAlbums}
          browse={Routes.user.manage.albums}
        />
      ) : (
          <h3>You have no albums yet. <Link className={styles.link} to={Routes.user.create.album}>Create a new album</Link>.</h3>
        )}
    </>
  )
}
