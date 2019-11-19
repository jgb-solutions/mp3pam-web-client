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
  icon?: ReactNode,
  title?: string,
  style?: string,
  buttonSize?: 'small' | 'medium' | 'large'
};

const UploadButton = ({ style, buttonSize, buttonStyle, icon, title, accept, onChange, multiple }: Props) => {
  const styles = useStyles();

  let input: HTMLInputElement | null;

  const triggerInput = () => {
    if (input) {
      input.click();
    }
  };

  return (
    <div className={style}>
      <Button className={`${styles.button} ${buttonStyle}`} onClick={triggerInput} size={buttonSize}>
        {icon} {title}
      </Button>
      <input
        style={{ display: 'none' }}
        ref={inputRef => { input = inputRef }}
        accept={accept}
        onChange={onChange}
        type="file"
        multiple={multiple}
      />
    </div>
  );
};

export default UploadButton;