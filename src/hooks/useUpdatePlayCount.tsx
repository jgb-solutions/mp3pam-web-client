import { useMutation } from '@apollo/react-hooks'

import { UPDATE_playCount } from '../graphql/mutations'


type PlayProps = {
  hash: string,
  type: string
}

type PlayCount = {
  updatePlayCount: (input: PlayProps) => void,
}

export default function useUpdatePlayCount(): PlayCount {
  const [updatePlayCountMutation] = useMutation(UPDATE_playCount, {
    fetchPolicy: 'no-cache',
  })

  const updatePlayCount = (input: PlayProps) => {
    updatePlayCountMutation({
      variables: { input }
    })
  }

  return { updatePlayCount }
}