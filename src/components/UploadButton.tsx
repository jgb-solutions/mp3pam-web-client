import React, { ReactNode } from 'react';
import { IconButton } from "@material-ui/core";
import colors from '../utils/colors';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  button: {
    color: colors.primary
  }
});

type Props = {
  accept: string,
  buttonStyle?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  multiple?: boolean,
  children: ReactNode
};

const UploadButton = (props: Props) => {
  const styles = useStyles();

  let input: HTMLInputElement | null;

  const triggerInput = () => {
    if (input) {
      input.click();
    }
  };

  return (
    <>
      <IconButton className={`${styles.button} ${props.buttonStyle}`} onClick={triggerInput} disableRipple>
        {props.children}
      </IconButton>
      <input
        style={{ display: 'none' }}
        ref={inputRef => { input = inputRef }}
        accept={props.accept}
        onChange={props.onChange}
        type="file"
        multiple={props.multiple}
      />
    </>
  );
};

export default UploadButton;