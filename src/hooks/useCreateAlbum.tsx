import { useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';

import { CREATE_ALBUM_MUTATION } from '../graphql/mutations';
import { AlbumData } from '../screens/manage/CreateAlbumScreen';

type hookValues = {
  createAlbum: (track: AlbumData) => void,
  loading: boolean,
  error: ApolloError | undefined,
  data: object
};

export default function useCreateAlbum(): hookValues {
  const [createAlbumMutation, { loading, error, data }] = useMutation(CREATE_ALBUM_MUTATION, {
    fetchPolicy: 'no-cache'
  });

  const createAlbum = (track: AlbumData) => {
    createAlbumMutation({ variables: { input: track } })
  };

  return { createAlbum, loading, error, data };
}
