import { useState, useEffect } from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import APIService from '../services/api';

import ListInterface from '../interfaces/ListInterface';

export const FETCH_LIST_TRACKS = gql`
  query listTracks($type: String!, $hash: Int!) {
    list(hash: $hash, type: $type) {
      hash
      title
      image
      tracks(take: 10) {
        data {
          hash
          title
          created_at
        }
      }
    }
  }
`;

function useList(
  listId: string,
  listParam: ListInterface | undefined = undefined
): [ListInterface | null, boolean, {} | null] {
  // const { loading, error, data } = useQuery(FETCH_LIST_TRACKS);
  const [list, setList] = useState<ListInterface | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setIsLoading(true);

      try {
        const response: any = await APIService.getList(listId);
        setList(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
        setIsLoading(false);
      }
    };

    if (listParam) {
      setList(listParam)
    } else {
      fetchList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [list, isLoading, error];
}

export default useList;