import { useMutation } from '@apollo/react-hooks'

import { DELETE_ARTIST } from '../graphql/mutations'
import { ApolloError } from 'apollo-client'
import { FETCH_ARTISTS } from '../graphql/queries'

type ReturnType = {
  deleteArtist: (hash: string) => void,
  deleteArtistResponse: {
    success: boolean
  },
  deletingArtist: boolean,
  errorDeletingArtist: ApolloError | undefined
}

export default function useDeleteArtist(): ReturnType {
  const [deleteArtistMutation, { data, loading, error }] = useMutation(DELETE_ARTIST, {
    fetchPolicy: 'no-cache',
    refetchQueries: [{ query: FETCH_ARTISTS }]
  })

  const deleteArtist = (hash: string) => {
    deleteArtistMutation({
      variables: { hash }
    })
  }

  return { deleteArtist, deleteArtistResponse: data, deletingArtist: loading, errorDeletingArtist: error }
}