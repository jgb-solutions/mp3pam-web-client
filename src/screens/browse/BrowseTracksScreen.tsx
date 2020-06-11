import React from "react"
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import { get } from "lodash-es"
import { Grid } from "@material-ui/core"
import InfiniteScroll from 'react-infinite-scroller'

import Spinner from "../../components/Spinner"
import HeaderTitle from "../../components/HeaderTitle"
import useTracks from "../../hooks/useTracks"
import TrackThumbnail from "../../components/TrackThumbnail"
import { TrackWithArtistThumbnailData } from "../../components/TrackScrollingList"
import SEO from "../../components/SEO"

export default function BrowseTracksScreen() {
  const { loading, error, data, loadMoreTracks, hasMore } = useTracks()
  const tracks = get(data, 'tracks')

  if (loading) return <Spinner.Full />

  if (error) return <p>Error Loading new data. Please refresh the page.</p>

  return (
    <>
      <HeaderTitle icon={<MusicNoteIcon />} text="Browse Tracks" />
      <SEO title={`Browse Tracks`} />

      <InfiniteScroll
        pageStart={1}
        loadMore={loadMoreTracks}
        hasMore={hasMore}
        loader={<Spinner key={1} />}
        useWindow={false}
      >
        <Grid container spacing={2}>
          {tracks.data.map((track: TrackWithArtistThumbnailData) => (
            <Grid item xs={4} md={3} sm={4} key={track.hash}>
              <TrackThumbnail track={track} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  )
}
