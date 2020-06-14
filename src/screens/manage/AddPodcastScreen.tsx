import axios from "axios"
import React, { useState, useEffect } from "react"
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import { get } from "lodash-es"
import useForm from 'react-hook-form'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'

import ProgressBar from "../../components/ProgressBar"
import TextField from "@material-ui/core/TextField"
import Button from '../../components/Button'
import UploadButton from '../../components/UploadButton'
import CheckAuth from "../../components/CheckAuth"

export const UPLOADUrl = gql`
  query getUploadUrl($name: String!, $type: String!) {
    uploadUrl(name: $name, type: $type) {
     signedUrl
		 fileUrl
    }
  }
`

export default function AddTrackScreen() {
  const client = useApolloClient()
  const [completed, setCompleted] = useState(0)
  const [isUploaded, setIsUploaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [fileUrl, setFileUrl] = useState("")
  const { register, handleSubmit, errors } = useForm<Values>()
  useEffect(() => {
    if (completed === 100) setCompleted(0)
  }, [completed])

  const handleProgressEvent = (progressEvent: ProgressEvent) => {
    console.log(progressEvent)
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    )
    console.log(percentCompleted)
    setCompleted(percentCompleted)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    setIsLoading(true)
    console.log(event)
    const file = get(event.target, 'files[0]')
    if (!file) return

    console.log("file", file)

    try {
      const { data: { uploadUrl: { signedUrl, fileUrl } } } = await client.query({
        query: UPLOADUrl,
        variables: { name: file.name, type },
        fetchPolicy: 'network-only'
      })

      setFileUrl(fileUrl)

      const options = {
        headers: {
          "Content-Type": file.type,
          "x-amz-acl": 'public-read'
          // 'Content-Disposition': 'attachment'
        },
        onUploadProgress: handleProgressEvent
      }

      try {
        const response = await axios.put(signedUrl, file, options)
        // Success
        setIsUploaded(true)
        setIsLoading(false)
        // response from DO Spaces servers
        console.log(response)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileUpload(event, 'img')
  }

  const handleAudioUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileUpload(event, 'sound')
  }

  type Stooge = "larry" | "moe" | "curly"

  type Values = {
    firstName?: string
    lastName?: string
    employed: boolean
    favoriteColor?: string
    toppings?: string[]
    sauces?: string[]
    stooge: Stooge
    notes?: string
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const onSubmit = async (values: Values) => {
    await sleep(300)
    window.alert(JSON.stringify(values, undefined, 2))
  }


  return (
    <CheckAuth>
      <h1>< CloudUploadIcon /> Upload Page {completed}%</h1>

      {/* <UploadButton
        accept="image/*"
        onChange={handleImageUpload}
        icon={<PhotoCameraIcon style={{ fontSize: 36 }} />}
      /> */}

      {completed > 0 && (
        <ProgressBar
          variant="determinate"
          color="secondary"
          value={completed}
        />
      )}

      {/* <UploadButton
        accept=".mp3, audio/mp3"
        onChange={handleAudioUpload}
        icon={<PlayCircleFilledIcon style={{ fontSize: 36 }} />}
      /> */}

      {completed > 0 && (
        <ProgressBar
          variant="determinate"
          color="secondary"
          value={completed}
        />
      )}

      {!isLoading && isUploaded && (
        <p>
          The file link is{" "}
          <a target="_blank" rel="noopener noreferrer" href={fileUrl}>
            {fileUrl}
          </a>
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Render Function as Children</h2>
        <div>
          <label>Phone</label>
          <TextField name="phone" inputRef={register({})} placeholder="Phone" />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </CheckAuth>
  )
}
