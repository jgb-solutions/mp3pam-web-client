import { useQuery } from '@apollo/react-hooks'

import { FETCH_MY_ALBUMS } from '../graphql/queries'
import { FETCH_MY_ALBUMS_NUMBER } from '../utils/constants'

export default function useMyAlbums() {
  return useQuery(FETCH_MY_ALBUMS, {
    variables: {
      take: FETCH_MY_ALBUMS_NUMBER,
    }
  })
}