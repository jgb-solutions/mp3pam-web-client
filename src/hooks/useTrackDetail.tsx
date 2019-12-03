import { useQuery } from '@apollo/react-hooks';

import { FETCH_TRACK } from '../graphql/queries';
import { ApolloError } from 'apollo-client';

type TrackDetail = {
  data: {
    track: {
      title: string,
      hash: string,
      audio_url: string,
      poster_url: string,
      featured: boolean,
      detail: string,
      lyrics: string,
      genre: {
        name: string,
        slug: string,
      }
      artist: {
        stage_name: string,
        hash: string,
      }
    },
  },
  loading: boolean,
  error: ApolloError | undefined
};

export default function useTrackDetail(hash: string): TrackDetail {
  const { loading, error, data } = useQuery(FETCH_TRACK, {
    variables: { hash }
  });

  return { loading, error, data };
};