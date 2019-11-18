import React, { useState } from 'react';
import axios from "axios";
import { useApolloClient } from '@apollo/react-hooks'
import { get } from "lodash-es";

import { UPLOAD_URL } from '../graphql/queries';

type UploadFileType = [
  (file: File) => void,
  string | undefined,
  boolean,
  object | null,
  boolean,
  number
];

const useFileUpload = (type: string, headers?: object): UploadFileType => {
  const client = useApolloClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [fileUrl, setFileUrl] = useState(undefined)
  const [isUploaded, setIsUploaded] = useState(false)
  const [percentUploaded, setPercentUploaded] = useState(0)

  const upload = async (file: File) => {
    setLoading(true);

    if (!file) return;

    console.log("file", file);

    try {
      const { data: { uploadUrl: { signedUrl, fileUrl } } } = await client.query({
        query: UPLOAD_URL,
        variables: { name: file.name, type },
        fetchPolicy: 'network-only'
      });

      setFileUrl(fileUrl);

      const options = {
        headers: {
          "Content-Type": file.type,
          "x-amz-acl": 'public-read',
          // 'Content-Disposition': 'attachment'
          ...headers
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          console.log(progressEvent);
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percentCompleted);
          setPercentUploaded(percentCompleted);
        }
      };

      try {
        const response = await axios.put(signedUrl, file, options);
        // Success
        setIsUploaded(true);
        setLoading(false);
        // response from DO Spaces servers
        console.log(response);
      } catch (error) {
        setError(error)
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error)
      setLoading(false);
    }
  };

  return [upload, fileUrl, loading, error, isUploaded, percentUploaded];
};

export default useFileUpload;