import { useQuery } from '@apollo/react-hooks'

import { FETCH_HOME } from '../graphql/queries'
import { HOMEPAGE_PER_PAGE_NUMBER } from '../utils/constants'

export default function useHome() {
  const { loading, error, data: homeData } = useQuery(FETCH_HOME, {
    notifyOnNetworkStatusChange: true,
    variables: {
      first: HOMEPAGE_PER_PAGE_NUMBER,
      orderby: [{ column: "created_at", order: 'DESC' }]
    },
    // fetchPolicy: 'cache-and-network'
  })

  return { loading, error, homeData }
}