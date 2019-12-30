import { useMutation } from '@apollo/react-hooks'

import { DELETE_ALBUM } from '../graphql/mutations'
import { ApolloError } from 'apollo-client'

type PlayCount = {
  deleteAlbum: (hash: string) => void,
  deleteAlbumResponse: {
    success: boolean
  },
  deletingAlbum: boolean,
  errorDeletingAlbum: ApolloError | undefined
}

export default function useDeleteAlbum(): PlayCount {
  const [deleteAlbumMutation, { data, loading, error }] = useMutation(DELETE_ALBUM, {
    fetchPolicy: 'no-cache',
  })

  const deleteAlbum = (hash: string) => {
    deleteAlbumMutation({
      variables: { hash }
    })
  }

  return { deleteAlbum, deleteAlbumResponse: data, deletingAlbum: loading, errorDeletingAlbum: error }
}