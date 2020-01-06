import { useMutation } from '@apollo/react-hooks'

import { DELETE_ALBUM_TRACK } from '../graphql/mutations'
import { ApolloError } from 'apollo-client'
import { FETCH_TRACKS } from '../graphql/queries'

type DeleteAlbumTrack = {
  deleteAlbumTrack: (hash: string) => void,
  deleteAlbumTrackResponse: {
    success: boolean
  },
  deletingAlbumTrack: boolean,
  errorDeletingAlbumTrack: ApolloError | undefined
}

export default function useDeleteAlbumTrack(): DeleteAlbumTrack {
  const [deleteAlbumTrackMutation, { data, loading, error }] = useMutation(DELETE_ALBUM_TRACK, {
    fetchPolicy: 'no-cache',
    refetchQueries: [{ query: FETCH_TRACKS }]
  })

  const deleteAlbumTrack = (hash: string) => {
    deleteAlbumTrackMutation({
      variables: { hash }
    })
  }

  return {
    deleteAlbumTrack,
    deleteAlbumTrackResponse: data,
    deletingAlbumTrack: loading,
    errorDeletingAlbumTrack: error
  }
}