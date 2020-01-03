import { useMutation } from '@apollo/react-hooks'

import { ADD_TRACK_TO_PLAYLIST } from '../graphql/mutations'
import { ApolloError } from 'apollo-client'

type InputProps = { playlistHash: string, trackHash: string }

type ReturnType = {
  addTrackToPlaylist: (input: InputProps) => void,
  data: {
    success: boolean
  },
  loading: boolean,
  error: ApolloError | undefined
}


export default function useAddTrackToPlaylist(): ReturnType {
  const [addTrackToPlaylistMutation, { data, loading, error }] = useMutation(ADD_TRACK_TO_PLAYLIST, {
    fetchPolicy: 'no-cache',
  })

  const addTrackToPlaylist = (input: InputProps) => {
    addTrackToPlaylistMutation({
      variables: { input }
    })
  }

  return {
    addTrackToPlaylist,
    data,
    loading,
    error
  }
}