import { useQuery } from '@apollo/react-hooks'

import { FETCH_MY_ARTISTS } from '../graphql/queries'
import { FETCH_MY_ARTISTS_NUMBER } from '../utils/constants'

export default function useMyTracks() {
  return useQuery(FETCH_MY_ARTISTS, {
    variables: {
      take: FETCH_MY_ARTISTS_NUMBER,
    }
  })
}