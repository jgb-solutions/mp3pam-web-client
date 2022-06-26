import { useQuery } from '@apollo/react-hooks'

import { FETCH_MANAGE_SCREEN } from '../graphql/queries'
import { MANAGE_PAGE_PER_PAGE_NUMBER } from '../utils/constants'

export default function useManage() {
  return useQuery(FETCH_MANAGE_SCREEN, {
    variables: {
      first: MANAGE_PAGE_PER_PAGE_NUMBER,
    },
    fetchPolicy: "network-only"
  })
}