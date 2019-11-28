import { useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';

import { ADD_TRACK_MUTATION } from '../graphql/mutations';
import { TrackData } from '../screens/manage/AddTrackScreen';

type hookValues = {
  addTrack: (track: TrackData) => void,
  loading: boolean,
  error: ApolloError | undefined,
  data: object
};

export default function useAddTrack(): hookValues {
  const [addTrackMutation, { loading, error, data }] = useMutation(ADD_TRACK_MUTATION, {
    fetchPolicy: 'no-cache'
  });

  const addTrack = (track: TrackData) => {
    addTrackMutation({ variables: { input: track } })
  };

  return { addTrack, loading, error, data };
}
