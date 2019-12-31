import { useMutation } from '@apollo/react-hooks'

import { ADD_TRACK_TO_ALBUM } from '../graphql/mutations'
import { ApolloError } from 'apollo-client'

type InputProps = { album_id: string, track_hash: string, track_number: number }

type ReturnType = {
  addTrackToAlbum: (input: InputProps) => void,
  data: {
    success: boolean
  },
  loading: boolean,
  error: ApolloError | undefined
}


export default function useAddTrackToAlbum(): ReturnType {
  const [addTrackToAlbumMutation, { data, loading, error }] = useMutation(ADD_TRACK_TO_ALBUM, {
    fetchPolicy: 'no-cache',
  })

  const addTrackToAlbum = (input: InputProps) => {
    addTrackToAlbumMutation({
      variables: { input }
    })
  }

  return {
    addTrackToAlbum,
    data,
    loading,
    error
  }
}