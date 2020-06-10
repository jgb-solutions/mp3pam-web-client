import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash-es'

import { FETCH_ALBUMS } from '../graphql/queries'
import { FETCH_ALBUMS_NUMBER } from '../utils/constants'

export default function useAlbums() {
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, data, fetchMore } = useQuery(FETCH_ALBUMS, {
    variables: {
      take: FETCH_ALBUMS_NUMBER,
      orderBy: [{ field: "inserted_at", order: 'DESC' }]
    }
  })

  const loadMoreAlbums = () => {
    const { currentPage } = data.albums.paginationInfo

    fetchMore({
      variables: {
        page: currentPage + 1
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const oldAlbums = get(previousResult, 'albums.data')
        const { data: newAlbums, ...newInfo } = get(fetchMoreResult, 'albums')

        if (newInfo.currentPage === currentPage) return

        setHasMore(newInfo.paginationInfo.hasMorePages)

        return {
          albums: {
            ...newInfo,
            data: [...oldAlbums, ...newAlbums]
          }
        }
      }
    })
  }

  return { loading, error, data, loadMoreAlbums, hasMore }
}