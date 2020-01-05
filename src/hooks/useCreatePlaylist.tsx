import { useMutation } from '@apollo/react-hooks'

import { CREATE_PLAYLIST } from '../graphql/mutations'
import { ApolloError } from 'apollo-client'

type ReturnType = {
  createPlaylist: (title: string) => void,
  data: {
    CreatePlaylist: {
      hash: string,
    }
  },
  loading: boolean,
  error: ApolloError | undefined
}


export default function useCreatePlaylist(): ReturnType {
  const [createPlaylistMutation, { data, loading, error }] = useMutation(CREATE_PLAYLIST, {
    fetchPolicy: 'no-cache',
  })

  const createPlaylist = (title: string) => {
    createPlaylistMutation({
      variables: { title }
    })
  }

  return {
    createPlaylist,
    data,
    loading,
    error
  }
}