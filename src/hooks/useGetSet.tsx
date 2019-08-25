import react, { useState, useEffect } from 'react';
import ListInterface from '../interfaces/ListInterface';

function useGetSet() {
  const [list, setList] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // call API service
    // fetch(listId)
    //   .then(response => response.json())
    //   .then(setList => {
    //     setList(setList);
    //     setIsLoading(false);
    //   });

    if (!list) {
      setList({
        id: "3432343",
        image: "https://images.mp3pam.com/demo/artist1.jpg",
        name: "Mushrooms",
        author: "PublicDomainPictures",
        type: "album"
      });
      // }, 2000);
    }
  }, []);

  return [ isLoading, list ];
}

export default useGetSet;