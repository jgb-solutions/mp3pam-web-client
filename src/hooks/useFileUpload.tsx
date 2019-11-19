import { useState } from 'react';
import axios from "axios";
import { useApolloClient } from '@apollo/react-hooks'

import { UPLOAD_URL } from '../graphql/queries';

type UploadFileType = [
  (file: File) => void,
  string | undefined,
  boolean,
  object | null,
  boolean,
  number
];

export default function useFileUpload(type: string, headers?: object): UploadFileType {
  const client = useApolloClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [fileUrl, setFileUrl] = useState(undefined)
  const [isUploaded, setIsUploaded] = useState(false)
  const [percentUploaded, setPercentUploaded] = useState(0)

  const upload = async (file: File) => {
    setLoading(true);

    if (!file) return;

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
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPercentUploaded(percentCompleted);
        }
      };

      try {
        const response = await axios.put(signedUrl, file, options);
        // Success
        setIsUploaded(true);
        setLoading(false);
      } catch (error) {
        setError(error)
        setLoading(false);
      }
    } catch (error) {
      setError(error)
      setLoading(false);
    }
  };

  return [upload, fileUrl, loading, error, isUploaded, percentUploaded];
};