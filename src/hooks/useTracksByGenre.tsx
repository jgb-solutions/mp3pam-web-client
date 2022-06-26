import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash-es'

import { FETCH_TRACKS_BY_GENRE } from '../graphql/queries'
import { FETCH_TRACKS_NUMBER } from '../utils/constants'

export default function useTracksByGenre(slug: string) {
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, data, fetchMore } = useQuery(FETCH_TRACKS_BY_GENRE, {
    variables: {
      first: FETCH_TRACKS_NUMBER,
      orderby: [{ column: "created_at", order: 'DESC' }],
      slug
    }
  })

  const loadMoreTracks = () => {
    const { currentPage } = data.tracksByGenre.paginatorInfo

    fetchMore({
      variables: {
        page: currentPage + 1,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const oldTracks = get(previousResult, 'tracksByGenre.data')
        const { data: newTracks, ...newInfo } = get(fetchMoreResult, 'tracksByGenre')

        setHasMore(newInfo.paginatorInfo.hasMorePages)

        return {
          tracksByGenre: {
            ...newInfo,
            data: [...oldTracks, ...newTracks]
          },
          genre: get(fetchMoreResult, 'genre')
        }
      }
    })
  }

  return { loading, error, data, loadMoreTracks, hasMore }
}