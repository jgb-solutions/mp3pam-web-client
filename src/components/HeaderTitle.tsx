import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginTop: 5,
    marginRight: 5,
  },
  text: {
    textTransform: 'capitalize'
  }
});

type Props = {
  icon: React.ReactNode,
  text: string,
  style?: object,
  textStyle?: object,
};

export default function HeaderTitle(props: Props) {
  const styles = useStyles();

  return (
    <div className={styles.container} style={props.style}>
      <div className={styles.icon} style={props.textStyle}>{props.icon}</div>
      <h1 className={styles.text} style={props.textStyle}>{props.text}</h1>
    </div>
  );
};