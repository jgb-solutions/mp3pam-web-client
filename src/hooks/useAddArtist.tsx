import { useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';

import { ADD_ARTIST_MUTATION } from '../graphql/mutations';
import { ArtistData } from '../screens/manage/AddArtistScreen';

type hookValues = {
  addArtist: (artist: ArtistData) => void,
  loading: boolean,
  error: ApolloError | undefined,
  data: any
};

export default function useAddArtist(): hookValues {
  const [addArtistMutation, { loading, error, data }] = useMutation(ADD_ARTIST_MUTATION, {
    fetchPolicy: 'no-cache'
  });

  const addArtist = (artist: ArtistData) => {
    addArtistMutation({ variables: { input: artist } })
  };

  return { addArtist, loading, error, data };
}
