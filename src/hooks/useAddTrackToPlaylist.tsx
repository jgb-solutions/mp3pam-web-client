import { useMutation } from '@apollo/react-hooks'

import { ADD_TRACK_TO_PLAYLIST } from '../graphql/mutations'
import { ApolloError } from 'apollo-client'
import { FETCH_PLAYLISTS } from '../graphql/queries'

type ReturnType = {
  addTrackToPlaylist: (playlistHash: string, trackHash: string) => void,
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

  const addTrackToPlaylist = (playlistHash: string, trackHash: string) => {
    console.log(playlistHash, trackHash)
    addTrackToPlaylistMutation({
      variables: { playlistHash, trackHash },
      refetchQueries: [{ query: FETCH_PLAYLISTS }]
    })
  }

  return {
    addTrackToPlaylist,
    data,
    loading,
    error
  }
}