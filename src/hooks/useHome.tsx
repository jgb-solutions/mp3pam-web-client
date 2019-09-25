import { useEffect } from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export const FETCH_HOME = gql`
  query homeMusics($page: Int) {
    # 10 latest tracks
    tracks(page: $page) {
      paginatorInfo {
        currentPage
        hasMorePages
      }
      data {
        title
      }
    }
  }
`;

export default function useHome() {
  const { loading, error, data, fetchMore } = useQuery(FETCH_HOME)

  useEffect(() => {
    console.log(error);
  }, [error])

  const loadMoreTracks = () => {
    const { hasMorePages, currentPage } = data.tracks.paginatorInfo;

    if (!hasMorePages) return;

    fetchMore({
      variables: {
        page: currentPage + 1
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { tracks: { data: oldTracks } } = previousResult;
        const { tracks: { data: newTracks, ...newInfo } } = fetchMoreResult;
        return {
          tracks: {
            ...newInfo,
            data: [...oldTracks, ...newTracks]
          }
        };
      }
    });
  }

  return { loading, error, homeData: data, loadMoreTracks };
};