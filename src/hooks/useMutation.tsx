import gql from 'graphql-tag'
import { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

export const FETCH_HOME = gql`
  mutation SignUp($input: RegisterInput!) {
    register(input: $input) {
      token
      currentSubscriber {
        id
      }
    }
  }
`

export default function useHome() {
  const client = useApolloClient()
  const [subscriberId, setSubscriberId] = useState(undefined)
  const [fetchHomeMutation, { loading, error, data }] = useMutation(FETCH_HOME, {
    onCompleted: data => {
      const {
        token,
        currentSubscriber: { id },
      } = data.register

      setSubscriberId(id)
      client.writeData({ data: { token } })
    },
  })

  const signup = (credentials: any) => {
    fetchHomeMutation({ variables: { input: credentials } })
  }

  return [signup, loading, subscriberId, error]
}
