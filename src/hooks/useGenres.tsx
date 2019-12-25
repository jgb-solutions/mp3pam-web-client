import { useQuery } from '@apollo/react-hooks'

import { FETCH_GENRES } from '../graphql/queries'

export default function useGenres() {
  return useQuery(FETCH_GENRES)
}