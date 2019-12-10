import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';

import { FETCH_DOWNLOAD_URL } from '../graphql/queries';
import { UPDATE_DOWNLOAD_COUNT } from '../graphql/mutations';

type TrackDetail = {
  data: {
    download: { url: string },
  },
  loading: boolean,
  error: ApolloError | undefined,
  fetchDownloadUrl: () => void,
  updateDownloadCount: () => void,
};

type DownloadProps = {
  hash: string,
  type: string
};

export default function useDownload(input: DownloadProps): TrackDetail {
  const [fetchDownloadUrl, { loading, error, data }] = useLazyQuery(FETCH_DOWNLOAD_URL, {
    variables: { input }
  });

  const [updateDownloadCount] = useMutation(UPDATE_DOWNLOAD_COUNT, {
    variables: { input },
    fetchPolicy: 'no-cache',
  });

  return { loading, error, data, fetchDownloadUrl, updateDownloadCount };
};