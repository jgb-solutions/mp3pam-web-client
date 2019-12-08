import { useLazyQuery } from "@apollo/react-hooks";

import { FETCH_RELATED_TRACKS } from '../graphql/queries';

export default function useRelatedTracks(hash: string) {
  const [fetchRelatedTracks, { loading, data, error }] = useLazyQuery(FETCH_RELATED_TRACKS, {
    variables: {
      input: {
        hash,
        take: 6
      }
    }
  });

  return { loading, error, data, fetchRelatedTracks };
};