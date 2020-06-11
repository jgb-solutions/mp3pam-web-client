import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash-es'

import { FETCH_ARTISTS } from '../graphql/queries'
import { FETCH_ARTISTS_NUMBER } from '../utils/constants'

export default function useArtists() {
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, data, fetchMore } = useQuery(FETCH_ARTISTS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      take: FETCH_ARTISTS_NUMBER,
      orderBy: [{ field: "inserted_at", order: 'DESC' }]
    }
  })

  const loadMoreArtists = () => {
    const { currentPage } = data.artists.paginationInfo

    fetchMore({
      variables: {
        page: currentPage + 1
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const oldArtists = get(previousResult, 'artists.data')
        const { data: newArtists, ...newInfo } = get(fetchMoreResult, 'artists')

        setHasMore(newInfo.paginationInfo.hasMorePages)

        return {
          artists: {
            ...newInfo,
            data: [...oldArtists, ...newArtists]
          }
        }
      }
    })
  }

  return { loading, error, data, loadMoreArtists, hasMore }
}