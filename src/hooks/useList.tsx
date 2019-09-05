import { useState, useEffect } from 'react';
import ListInterface from '../interfaces/ListInterface';
import APIService from '../services/api';
import { AxiosResponse } from 'axios';


function useList(listId: string, listParam: ListInterface | undefined = undefined): [ListInterface | null, boolean, {} | null] {
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

  return [ list, isLoading, error ];
}

export default useList;