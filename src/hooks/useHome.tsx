import { useEffect } from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export const FETCH_HOME = gql`
  query homeMusics {
    # 10 latest tracks
    tracks(take: 10) {
      data {
        hash
        title
        created_at
      }
    }
  }
`

export default function useHome() {
  const { loading, error, data } = useQuery(FETCH_HOME)

  useEffect(() => {
    console.log(error);
  }, [error])

  return [loading, error, data]
};