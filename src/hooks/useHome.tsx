import { useQuery } from '@apollo/react-hooks';

import { FETCH_HOME } from '../graphql/queries';

export default function useHome() {
  // const [hasMore, setHasMore] = useState(true);
  const { loading, error, data: homeData } = useQuery(FETCH_HOME, {
    notifyOnNetworkStatusChange: true,
    variables: {
      take: 10,
      orderBy: [{ field: "created_at", order: 'DESC' }]
    },
    onCompleted: (data => console.log(data))
  });

  // const loadMoreTracks = () => {
  //   const { hasMorePages, currentPage } = data.tracks.paginatorInfo;

  //   setHasMore(hasMorePages)

  //   fetchMore({
  //     variables: {
  //       page: currentPage + 1
  //     },
  //     updateQuery: (previousResult, { fetchMoreResult }) => {
  //       const { tracks: { data: oldTracks } } = previousResult;
  //       const { tracks: { data: newTracks, ...newInfo } } = fetchMoreResult;
  //       return {
  //         tracks: {
  //           ...newInfo,
  //           data: [...oldTracks, ...newTracks]
  //         }
  //       };
  //     }
  //   });
  // }

  return { loading, error, homeData };
};