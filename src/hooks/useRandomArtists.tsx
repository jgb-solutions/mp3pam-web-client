import { useLazyQuery } from "@apollo/react-hooks"

import { FETCH_RANDOM_ARTISTS } from '../graphql/queries'
import { RANDOM_ARTISTS_NUMBER } from "../utils/constants"

export default function useRandomArtists(hash: string) {
  const [fetchRandomdArtists, { loading, data, error }] = useLazyQuery(FETCH_RANDOM_ARTISTS, {
    variables: {
      input: {
        hash,
        first: RANDOM_ARTISTS_NUMBER
      }
    }
  })

  return { loading, error, data, fetchRandomdArtists }
}