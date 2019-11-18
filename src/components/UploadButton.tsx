import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/styles';
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
  children: ReactNode,
  style?: string,
  buttonSize?: 'small' | 'medium' | 'large'
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
    <div className={props.style}>
      <Button className={`${styles.button} ${props.buttonStyle}`} onClick={triggerInput} size={props.buttonSize}>
        {props.children}
      </Button>
      <input
        style={{ display: 'none' }}
        ref={inputRef => { input = inputRef }}
        accept={props.accept}
        onChange={props.onChange}
        type="file"
        multiple={props.multiple}
      />
    </div>
  );
};

export default UploadButton;