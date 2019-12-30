import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash-es'

import { FETCH_MY_ALBUMS } from '../graphql/queries'
import { FETCH_ALBUMS_NUMBER } from '../utils/constants'

export default function useMyAlbums() {
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, data, fetchMore, refetch } = useQuery(FETCH_MY_ALBUMS, {
    variables: {
      take: FETCH_ALBUMS_NUMBER,
    }
  })

  const loadMoreAlbums = () => {
    const { currentPage } = data.albums.paginatorInfo

    fetchMore({
      variables: {
        page: currentPage + 1
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const oldAlbums = get(previousResult, 'me.albums.data')
        const { data: newAlbums, ...newInfo } = get(fetchMoreResult, 'albums')

        setHasMore(newInfo.paginatorInfo.hasMorePages)

        return {
          me: {
            albums: {
              ...newInfo,
              data: [...oldAlbums, ...newAlbums]
            }
          }
        }
      }
    })
  }

  return { loading, error, data, loadMoreAlbums, hasMore, refetch }
}