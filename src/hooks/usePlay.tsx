import { useMutation } from '@apollo/react-hooks';

import { UPDATE_PLAY_COUNT } from '../graphql/mutations';


type PlayProps = {
  hash: string,
  type: string
};

type PlayCount = {
  updatePlayCount: (input: PlayProps) => void,
};

export default function usePlay(): PlayCount {
  const [updatePlayCountMutation] = useMutation(UPDATE_PLAY_COUNT, {
    fetchPolicy: 'no-cache',
  });

  const updatePlayCount = (input: PlayProps) => {
    updatePlayCountMutation({
      variables: { input }
    });
  }

  return { updatePlayCount };
};