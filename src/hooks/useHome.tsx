import { useQuery } from '@apollo/react-hooks'

import { FETCH_HOME } from '../graphql/queries'
import { HOMEPAGE_PER_PAGE_NUMBER } from '../utils/constants'

export default function useHome() {
  const { loading, error, data: homeData } = useQuery(FETCH_HOME, {

    variables: {
      take: HOMEPAGE_PER_PAGE_NUMBER,
      orderBy: [{ field: "inserted_at", order: 'DESC' }]
    },
    // fetchPolicy: 'cache-and-network'
  })

  return { loading, error, homeData }
}