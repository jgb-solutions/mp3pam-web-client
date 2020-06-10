import React from "react"
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import { get } from "lodash-es"
import { Grid } from "@material-ui/core"
import InfiniteScroll from 'react-infinite-scroller'
import { useParams } from "react-router-dom"

import Spinner from "../../components/Spinner"
import HeaderTitle from "../../components/HeaderTitle"
import useTracksByGenre from "../../hooks/useTracksByGenre"
import TrackThumbnail from "../../components/TrackThumbnail"
import { TrackWithArtistThumbnailData } from "../../components/TrackScrollingList"
import SEO from "../../components/SEO"

export default function BrowseTracksByGenreScreen() {
  const params = useParams()
  const slug = get(params, 'slug')
  const { loading, error, data, loadMoreTracks, hasMore } = useTracksByGenre(slug)
  const tracksByGenre = get(data, 'tracksByGenre')
  const genre = get(data, 'genre')

  if (loading) return <Spinner.Full />

  if (error) return <p>Error Loading new data. Please refresh the page.</p>

  return (
    <>
      <HeaderTitle icon={<MusicNoteIcon />} text={`Browse ${genre ? genre.name : ''}  Tracks`} />
      <SEO title={`Browse ${genre ? genre.name : ''}  Tracks`} />

      <InfiniteScroll
        //  pageStart={1}
        loadMore={loadMoreTracks}
        hasMore={hasMore}
        loader={<Spinner key={1} />}
        useWindow={false}
      >
        <Grid container spacing={2}>
          {tracksByGenre.data.map((track: TrackWithArtistThumbnailData) => (
            <Grid item xs={4} md={3} sm={4} key={track.hash}>
              <TrackThumbnail track={track} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  )
}
