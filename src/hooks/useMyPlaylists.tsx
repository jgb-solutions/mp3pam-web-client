import { useQuery } from '@apollo/react-hooks'

import { FETCH_MY_PLAYLISTS } from '../graphql/queries'
import { FETCH_MY_PLAYLISTS_NUMBER } from '../utils/constants'

export default function useMyPlaylists() {
  return useQuery(FETCH_MY_PLAYLISTS, {
    variables: {
      first: FETCH_MY_PLAYLISTS_NUMBER,
    }
  })
}