import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/styles';
import { get } from "lodash-es";

import Button from './Button';

const useStyles = makeStyles({
  button: {
    // color: colors.primary
  }
});

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
  onFileSizeInvalid?: (fileSize: number) => void
};

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
  onFileSizeInvalid
}: Props) => {
  const styles = useStyles();

  let input: HTMLInputElement | null;

  const triggerInput = () => {
    if (input) {
      input.click();
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = get(event, 'target.files[0]');

    if (file && allowedFileSize && onFileSizeInvalid) {
      if (file.size > allowedFileSize) {
        onFileSizeInvalid(file.size);

        return;
      }
    }

    onChange(event);
  };

  return (
    <div className={style}>
      <Button
        className={`${styles.button} ${buttonStyle}`}
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
  );
};

export default UploadButton;