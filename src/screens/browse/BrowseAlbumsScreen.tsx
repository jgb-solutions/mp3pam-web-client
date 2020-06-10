import React from "react"
import AlbumIcon from '@material-ui/icons/Album'
import { get } from "lodash-es"
import { Grid } from "@material-ui/core"
import InfiniteScroll from 'react-infinite-scroller'

import Spinner from "../../components/Spinner"
import HeaderTitle from "../../components/HeaderTitle"
import useAlbums from "../../hooks/useAlbums"
import AlbumThumbnail from "../../components/AlbumThumbnail"
import { AlbumThumbnailData } from "../../components/AlbumScrollingList"
import SEO from "../../components/SEO"

export default function BrowseAlbumsScreen() {
  const { loading, error, data, loadMoreAlbums, hasMore } = useAlbums()
  const albums = get(data, 'albums')

  if (loading) return <Spinner.Full />

  if (error) return <p>Error Loading new data. Please refresh the page.</p>

  return (
    <>
      {albums.data.length ? (
        <>
          <HeaderTitle icon={<AlbumIcon />} text="Browse Albums" />
          <SEO title={`Browse Albums`} />

          <InfiniteScroll
            ////  pageStart={1}
            loadMore={loadMoreAlbums}
            hasMore={hasMore}
            loader={<Spinner key={1} />}
            useWindow={false}
          >
            <Grid container spacing={2}>
              {albums.data.map((album: AlbumThumbnailData) => (
                <Grid item xs={4} md={3} sm={4} key={album.hash}>
                  <AlbumThumbnail album={album} />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </>
      ) : (
          <HeaderTitle icon={<AlbumIcon />} text="No albums yet" />
        )}
    </>
  )
}
