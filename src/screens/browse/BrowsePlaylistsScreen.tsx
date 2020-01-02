import React from "react"
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import { get } from "lodash-es"
import { Grid } from "@material-ui/core"
import InfiniteScroll from 'react-infinite-scroller'

import Spinner from "../../components/Spinner"
import HeaderTitle from "../../components/HeaderTitle"
import usePlaylists from "../../hooks/usePlaylists"
import PlaylistThumbnail from "../../components/PlaylistThumbnail"
import { PlaylistThumbnailData } from "../../components/PlaylistScrollingList"

export default function BrowsePlaylistsScreen() {
  const { loading, error, data, loadMorePlaylists, hasMore } = usePlaylists()
  const playlists = get(data, 'playlists')

  if (loading) return <Spinner.Full />

  if (error) return <p>Error Loading new data. Please refresh the page.</p>

  return (
    <>
      <HeaderTitle icon={<PersonPinCircleIcon />} text="Browse Playlists" />
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMorePlaylists}
        hasMore={hasMore}
        loader={<Spinner key={1} />}
        useWindow={false}
      >
        <Grid container spacing={2}>
          {playlists.data.map((playlist: PlaylistThumbnailData) => (
            <Grid item xs={4} md={3} sm={4} key={playlist.hash}>
              <PlaylistThumbnail playlist={playlist} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  )
}
