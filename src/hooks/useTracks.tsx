import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash-es'

import { FETCH_TRACKS } from '../graphql/queries'
import { FETCH_TRACKS_NUMBER } from '../utils/constants'

export default function useTracks() {
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, data, fetchMore } = useQuery(FETCH_TRACKS, {
    variables: {
      take: FETCH_TRACKS_NUMBER,
      orderBy: [{ field: "created_at", order: 'DESC' }]
    }
  })

  const loadMoreTracks = () => {
    const { currentPage } = data.tracks.paginatorInfo

    fetchMore({
      variables: {
        page: currentPage + 1
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const oldTracks = get(previousResult, 'tracks.data')
        const { data: newTracks, ...newInfo } = get(fetchMoreResult, 'tracks')

        setHasMore(newInfo.paginatorInfo.hasMorePages)

        return {
          tracks: {
            ...newInfo,
            data: [...oldTracks, ...newTracks]
          }
        }
      }
    })
  }

  return { loading, error, data, loadMoreTracks, hasMore }
}