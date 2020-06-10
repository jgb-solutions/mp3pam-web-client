import { useMutation, useQuery } from '@apollo/react-hooks'
import { ApolloError } from 'apollo-client'

import { FETCH_DOWNLOAD_URL } from '../graphql/queries'
import { UPDATE_downloadCount } from '../graphql/mutations'

type TrackDetail = {
  data: {
    download: { url: string },
  },
  loading: boolean,
  error: ApolloError | undefined,
  updateDownloadCount: () => void,
}

type DownloadProps = {
  hash: string,
  type: string
}

export default function useDownload(input: DownloadProps): TrackDetail {
  const { loading, error, data } = useQuery(FETCH_DOWNLOAD_URL, {
    variables: { input }
  })

  const [updateDownloadCount] = useMutation(UPDATE_downloadCount, {
    variables: { input },
    fetchPolicy: 'no-cache',
  })

  return { loading, error, data, updateDownloadCount }
}