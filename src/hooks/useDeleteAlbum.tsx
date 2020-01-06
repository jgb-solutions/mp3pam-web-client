import { useMutation } from '@apollo/react-hooks'

import { DELETE_ALBUM } from '../graphql/mutations'
import { ApolloError } from 'apollo-client'
import { FETCH_ALBUMS } from '../graphql/queries'

type ReturnType = {
  deleteAlbum: (hash: string) => void,
  deleteAlbumResponse: {
    success: boolean
  },
  deletingAlbum: boolean,
  errorDeletingAlbum: ApolloError | undefined
}

export default function useDeleteAlbum(): ReturnType {
  const [deleteAlbumMutation, { data, loading, error }] = useMutation(DELETE_ALBUM, {
    fetchPolicy: 'no-cache',
    refetchQueries: [{ query: FETCH_ALBUMS }]
  })

  const deleteAlbum = (hash: string) => {
    deleteAlbumMutation({
      variables: { hash }
    })
  }

  return { deleteAlbum, deleteAlbumResponse: data, deletingAlbum: loading, errorDeletingAlbum: error }
}