import { useLazyQuery } from '@apollo/react-hooks'

import { SEARCH_QUERY } from '../graphql/queries'
import { ApolloError } from 'apollo-client'
import { SearchData } from '../interfaces/SearchInterface'

type SearchResult = {
  search: (query: string) => void,
  data: {
    search: SearchData,
  },
  loading: boolean,
  error: ApolloError | undefined
}

export default function useSearch(): SearchResult {
  const [searchQuery, { loading, error, data }] = useLazyQuery(SEARCH_QUERY)

  const search = (query: string) => {
    searchQuery({ variables: { query } })
  }

  return { search, loading, error, data }
}