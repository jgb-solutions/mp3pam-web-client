import { useState, useEffect } from 'react'
import axios from "axios"
import { useApolloClient } from '@apollo/react-hooks'

import { UPLOADUrl_QUERY } from '../graphql/queries'

type UploadFileType = {
  upload: (file: File) => void,
  fileUrl: string | undefined,
  filename: string | undefined,
  size: number,
  uploading: boolean,
  error: object | null,
  isUploaded: boolean,
  percentUploaded: number,
  isValid: boolean,
  errorMessage: string | undefined
}

type Params = {
  bucket: string,
  message?: string | undefined,
  headers?: {
    public?: boolean,
    attachment?: boolean
  }
}

export default function useFileUpload({ bucket, message, headers }: Params): UploadFileType {
  const client = useApolloClient()

  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [fileUrl, setFileUrl] = useState(undefined)
  const [filename, setFilename] = useState(undefined)
  const [isUploaded, setIsUploaded] = useState(false)
  const [percentUploaded, setPercentUploaded] = useState(0)
  const [size, setSize] = useState(0)

  const getHeaders = () => {
    let h: any = {}

    if (headers && headers.public) {
      h["x-amz-acl"] = 'public-read'
    }

    if (headers && headers.attachment) {
      h['Content-Disposition'] = 'attachment'
    }

    return h
  }

  useEffect(() => {
    if (isValid) {
      setErrorMessage(undefined)
    } else {
      setErrorMessage(message || "Please choose a file.")
    }
    // eslint-disable-next-line
  }, [isValid])

  useEffect(() => {
    if (percentUploaded === 100) {
      setIsUploaded(true)
    }
    setUploading(percentUploaded > 0 && percentUploaded < 100)
  }, [percentUploaded])

  const upload = async (file: File) => {
    if (!file) return

    // file size
    setSize(file.size)

    try {
      const { data: { uploadUrl: { signedUrl, fileUrl, filename } } } = await client.query({
        query: UPLOADUrl_QUERY,
        variables: {
          input: {
            name: file.name,
            bucket,
            ...headers
          }
        },
        fetchPolicy: 'network-only'
      })

      setFileUrl(fileUrl)
      setFilename(filename)

      const options = {
        headers: {
          "Content-Type": file.type,
          'X-Requested-With': 'XMLHttpRequest',
          ...getHeaders()
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setPercentUploaded(percentCompleted)
        }
      }

      try {
        setIsValid(true)
        await axios.put(signedUrl, file, options)
      } catch (error) {
        setError(error)
        setIsValid(false)
      }
    } catch (error) {
      setError(error)
    }
  }

  return {
    upload,
    fileUrl,
    size,
    uploading,
    error,
    isUploaded,
    percentUploaded,
    isValid,
    errorMessage,
    filename
  }
}