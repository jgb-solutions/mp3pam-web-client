import { useMutation } from '@apollo/react-hooks'

import { DELETE_TRACK } from '../graphql/mutations'
import { ApolloError } from 'apollo-client'
import { FETCH_TRACKS } from '../graphql/queries'

type ReturnType = {
  deleteTrack: (hash: string) => void,
  deleteTrackResponse: {
    success: boolean
  },
  deletingTrack: boolean,
  errorDeletingTrack: ApolloError | undefined
}

export default function useDeleteTrack(): ReturnType {
  const [deleteTrackMutation, { data, loading, error }] = useMutation(DELETE_TRACK, {
    fetchPolicy: 'no-cache',
    refetchQueries: [{ query: FETCH_TRACKS }]
  })

  const deleteTrack = (hash: string) => {
    deleteTrackMutation({
      variables: { hash }
    })
  }

  return { deleteTrack, deleteTrackResponse: data, deletingTrack: loading, errorDeletingTrack: error }
}