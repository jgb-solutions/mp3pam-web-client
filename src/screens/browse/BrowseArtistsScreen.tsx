import React, { useEffect } from "react";
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import { get } from "lodash-es";
import { Grid } from "@material-ui/core";
import InfiniteScroll from 'react-infinite-scroller';

import Spinner from "../../components/Spinner";
import HeaderTitle from "../../components/HeaderTitle";
import useArtists from "../../hooks/useArtists";
import ArtistThumbnail from "../../components/ArtistThumbnail";
import { ArtistThumbnailData } from "../../components/ArtistScrollingList";

export default function BrowseArtistsScreen() {
  const { loading, error, data, loadMoreArtists, hasMore } = useArtists();
  const artists = get(data, 'artists');
  // fetch home data
  useEffect(() => {
    console.log(data);
  }, [data])

  if (loading) return <Spinner.Full />;

  if (error) return <p>Error Loading new data. Please refresh the page.</p>;

  return (
    <>
      <HeaderTitle icon={<PersonPinCircleIcon />} text="Browse Artists" />
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMoreArtists}
        hasMore={hasMore}
        loader={<Spinner key={1} />}
        useWindow={false}
      >
        <Grid container spacing={2}>
          {artists.data.map((artist: ArtistThumbnailData) => (
            <Grid item xs={4} md={3} sm={4} key={artist.hash}>
              <ArtistThumbnail artist={artist} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
}
