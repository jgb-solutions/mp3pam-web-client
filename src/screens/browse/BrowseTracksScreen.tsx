import React, { useEffect } from "react";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { get } from "lodash-es";

import Spinner from "../../components/Spinner";
import HeaderTitle from "../../components/HeaderTitle";
import useTracks from "../../hooks/useTracks";
import TrackThumbnail from "../../components/TrackThumbnail";
import { useTrackScrollingListStyles, TrackWithArtistThumbnailData } from "../../components/TrackScrollingList";

export default function BrowseTrackScreen() {
  const trackThumnailStyles = useTrackScrollingListStyles()
  const { loading, error, data } = useTracks();
  const tracks = get(data, 'tracks');
  // fetch home data
  useEffect(() => {
    console.log(data);
  }, [data])

  if (loading) return <Spinner.Full />;

  if (error) return <p>Error Loading new data. Please refresh the page.</p>;

  return (
    <>
      <HeaderTitle icon={<MusicNoteIcon />} text="Browse Tracks" />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tracks.data.map((track: TrackWithArtistThumbnailData) => (
          <TrackThumbnail key={track.hash} className={trackThumnailStyles.thumbnail} track={track} />
        ))}
      </div>
    </>
  );
}
