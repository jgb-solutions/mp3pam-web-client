import { useLazyQuery } from "@apollo/react-hooks"

import { FETCH_RANDOM_PLAYLISTS } from '../graphql/queries'
import { RANDOM_PLAYLISTS_NUMBER } from "../utils/constants"

export default function useRandomPlaylists(hash: string) {
  const [fetchRandomPlaylists, { loading, data, error }] = useLazyQuery(FETCH_RANDOM_PLAYLISTS, {
    variables: {
      input: {
        hash,
        first: RANDOM_PLAYLISTS_NUMBER
      }
    }
  })

  return { loading, error, data, fetchRandomPlaylists }
}