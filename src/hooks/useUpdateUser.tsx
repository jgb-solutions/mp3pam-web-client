import { useMutation } from '@apollo/react-hooks';

import { UPDATE_USER } from '../graphql/mutations';
import { UserData } from '../interfaces/UserInterface';
import { ApolloError } from 'apollo-client';

type UserProps = {
  id: string,
  name?: string,
  email?: string,
  password?: string,
  telephone?: string,
  avatar?: string,
};

type Props = {
  updateUser: (input: UserProps) => void,
  data: {
    updateUser: UserData
  },
  loading: boolean,
  error: ApolloError | undefined
};

export default function useUpdateUser(): Props {
  const [updateUserMutation, { data, error, loading }] = useMutation(UPDATE_USER, {
    fetchPolicy: 'no-cache',
  });

  const updateUser = (input: UserProps) => {
    console.log(input);
    updateUserMutation({
      variables: { input }
    });
  }

  return { updateUser, data, error, loading };
};