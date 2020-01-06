import React, { ReactNode } from 'react'
import { get } from "lodash-es"

import Button from './Button'

export interface ImageDimensions {
  width: number
  height: number
}

type Props = {
  accept: string,
  buttonStyle?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  multiple?: boolean,
  icon?: ReactNode,
  title?: string,
  style?: string,
  buttonSize?: 'small' | 'medium' | 'large',
  disabled?: boolean,
  fullWidth?: boolean,
  allowedFileSize?: number,
  onFileSizeInvalid?: (fileSize: number) => void,
  allowedFileType?: string,
  onFileTypeInvalid?: (filetype: string) => void,
  onDimensionsInvalid?: (dimensions: ImageDimensions) => void
  validateImageDimensions?: (dimensions: ImageDimensions) => boolean
}

const UploadButton = ({
  style,
  buttonSize,
  buttonStyle,
  icon,
  title,
  accept,
  onChange,
  multiple,
  disabled,
  fullWidth,
  allowedFileSize,
  onFileSizeInvalid,
  allowedFileType,
  onFileTypeInvalid,
  onDimensionsInvalid,
  validateImageDimensions

}: Props) => {
  let input: HTMLInputElement | null

  const triggerInput = () => {
    if (input) {
      input.click()
    }
  }

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = get(event, 'target.files[0]')

    if (file) {
      if (allowedFileSize && onFileSizeInvalid) {
        if (file.size > allowedFileSize) {
          onFileSizeInvalid(file.size)
          return
        }
      }

      if (allowedFileType && onFileTypeInvalid) {
        const ext = file.name.split('.').pop() || ''
        if (!allowedFileType.split(', ').includes(ext)) {
          onFileTypeInvalid(file.name)
          return
        }
      }

      if (onDimensionsInvalid && validateImageDimensions) {
        const dimensions = await getImageDimensions(file)

        if (!validateImageDimensions(dimensions)) {
          onDimensionsInvalid(dimensions)
          return
        }
      }

      onChange(event)
    }

    return
  }

  const getImageDimensions = (file: File): Promise<ImageDimensions> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = readerEvt => {
        let image = new Image()

        image.onload = imgEvt => {
          const { width, height } = get(imgEvt, 'path[0]') || get(imgEvt, 'srcElement')
          resolve({ width, height })
        }

        image.src = get(readerEvt, 'target.result')

        reader.onerror = () => {
          reader.abort()

          reject(new DOMException("Problem parsing the file bitch."))
        }
      }

      reader.readAsDataURL(file)
    })
  }

  return (
    <div className={style}>
      <Button
        className={buttonStyle}
        onClick={triggerInput}
        size={buttonSize}
        disabled={disabled}
        fullWidth={fullWidth}>
        {icon} {title}
      </Button>
      <input
        style={{ display: 'none' }}
        ref={inputRef => { input = inputRef }}
        accept={accept}
        onChange={handleOnChange}
        type="file"
        multiple={multiple}
      />
    </div>
  )
}

export default UploadButton