import { useQuery } from '@apollo/react-hooks';

import { FETCH_HOME } from '../graphql/queries';

export default function useHome() {
  const { loading, error, data: homeData } = useQuery(FETCH_HOME, {
    notifyOnNetworkStatusChange: true,
    variables: {
      take: 10,
      orderBy: [{ field: "created_at", order: 'DESC' }]
    },
    // fetchPolicy: 'cache-and-network'
  });

  return { loading, error, homeData };
};