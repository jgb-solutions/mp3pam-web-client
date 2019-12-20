import { useLazyQuery } from "@apollo/react-hooks"

import { FETCH_RELATED_TRACKS } from '../graphql/queries'
import { RELATED_TRACKS_NUMBER } from "../utils/constants"

export default function useRelatedTracks(hash: string) {
  const [fetchRelatedTracks, { loading, data, error }] = useLazyQuery(FETCH_RELATED_TRACKS, {
    variables: {
      input: {
        hash,
        take: RELATED_TRACKS_NUMBER
      }
    }
  })

  return { loading, error, data, fetchRelatedTracks }
}