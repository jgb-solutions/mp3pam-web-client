import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash-es'

import { FETCH_PLAYLISTS } from '../graphql/queries'
import { FETCH_PLAYLISTS_NUMBER } from '../utils/constants'

export default function usePlaylists() {
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, data, fetchMore } = useQuery(FETCH_PLAYLISTS, {
    variables: {
      take: FETCH_PLAYLISTS_NUMBER,
      orderBy: [{ field: "inserted_at", order: 'DESC' }]
    }
  })

  const loadMorePlaylists = () => {
    const { currentPage } = data.playlists.paginationInfo

    fetchMore({
      variables: {
        page: currentPage + 1
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const oldPlaylists = get(previousResult, 'playlists.data')
        const { data: newPlaylists, ...newInfo } = get(fetchMoreResult, 'playlists')

        if (newInfo.currentPage === currentPage) return

        setHasMore(newInfo.paginationInfo.hasMorePages)

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