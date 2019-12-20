import { useMutation } from '@apollo/react-hooks'
import { ApolloError } from 'apollo-client'

import { ADD_TRACK_MUTATION } from '../graphql/mutations'
import { TrackData } from '../screens/manage/AddTrackScreen'
import { FETCH_HOME } from '../graphql/queries'

type hookValues = {
  addTrack: (track: TrackData) => void,
  loading: boolean,
  error: ApolloError | undefined,
  data: object
}

export default function useAddTrack(): hookValues {
  const [addTrackMutation, { loading, error, data }] = useMutation(ADD_TRACK_MUTATION, {
    fetchPolicy: 'no-cache',
    refetchQueries: [{ query: FETCH_HOME }]
  })

  const addTrack = (track: TrackData) => {
    addTrackMutation({ variables: { input: track } })
  }

  return { addTrack, loading, error, data }
}
