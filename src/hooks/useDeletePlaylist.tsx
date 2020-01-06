import { useMutation } from '@apollo/react-hooks'

import { DELETE_PLAYLIST } from '../graphql/mutations'
import { ApolloError } from 'apollo-client'
import { FETCH_PLAYLISTS } from '../graphql/queries'

type ReturnType = {
  deletePlaylist: (hash: string) => void,
  deletePlaylistResponse: {
    success: boolean
  },
  deletingPlaylist: boolean,
  errorDeletingPlaylist: ApolloError | undefined
}

export default function useDeletePlaylist(): ReturnType {
  const [deletePlaylistMutation, { data, loading, error }] = useMutation(DELETE_PLAYLIST, {
    fetchPolicy: 'no-cache',
    refetchQueries: [{ query: FETCH_PLAYLISTS }]
  })

  const deletePlaylist = (hash: string) => {
    deletePlaylistMutation({
      variables: { hash }
    })
  }

  return { deletePlaylist, deletePlaylistResponse: data, deletingPlaylist: loading, errorDeletingPlaylist: error }
}