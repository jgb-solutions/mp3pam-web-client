import { useQuery } from '@apollo/react-hooks'

import { FETCH_MY_TRACKS } from '../graphql/queries'
import { FETCH_MY_TRACKS_NUMBER } from '../utils/constants'

export default function useMyTracks() {
  return useQuery(FETCH_MY_TRACKS, {
    variables: {
      take: FETCH_MY_TRACKS_NUMBER,
    }
  })
}