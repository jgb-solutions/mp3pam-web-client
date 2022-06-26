import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash-es'

import { FETCH_PLAYLISTS } from '../graphql/queries'
import { FETCH_PLAYLISTS_NUMBER } from '../utils/constants'

export default function usePlaylists() {
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, data, fetchMore } = useQuery(FETCH_PLAYLISTS, {
    variables: {
      first: FETCH_PLAYLISTS_NUMBER,
      orderby: [{ column: "created_at", order: 'DESC' }]
    }
  })

  const loadMorePlaylists = () => {
    const { currentPage } = data.playlists.paginatorInfo

    fetchMore({
      variables: {
        page: currentPage + 1
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const oldPlaylists = get(previousResult, 'playlists.data')
        const { data: newPlaylists, ...newInfo } = get(fetchMoreResult, 'playlists')

        setHasMore(newInfo.paginatorInfo.hasMorePages)

        return {
          playlists: {
            ...newInfo,
            data: [...oldPlaylists, ...newPlaylists]
          }
        }
      }
    })
  }

  return { loading, error, data, loadMorePlaylists, hasMore }
}