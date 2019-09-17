import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export const FETCH_HOME = gql`
  query homeMusics($take: Int) {
    musics(take: $take) {
      paginatorInfo {
        perPage
      }
      data {
        hash
        title
        created_at
      }
    }
  }
`

export default function useHome() {
  return useQuery(FETCH_HOME)
};