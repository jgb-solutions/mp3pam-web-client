import { useQuery } from '@apollo/react-hooks'

import { FETCH_ALBUM } from '../graphql/queries'
import { ApolloError } from 'apollo-client'
import AlbumInterface from '../interfaces/AlbumInterface'

type AlbumDetail = {
  data: {
    album: AlbumInterface,
  },
  loading: boolean,
  error: ApolloError | undefined,
  refetch: () => void,
}

export default function useAlbumDetail(hash: string): AlbumDetail {
  const { loading, error, data, refetch } = useQuery(FETCH_ALBUM, {
    variables: { hash },
    fetchPolicy: 'network-only'
  })

  return { loading, error, data, refetch }
}