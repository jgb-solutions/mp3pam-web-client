import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
  },
  logo: {
  },
  loaderSvg: {
    margin: '0 auto',
    maxWidth: '100%',
  },
}));

type Props = {

};

const Right = (props: Props) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        {/* <img className={styles.loaderSvg} alt='svg' src="/assets/images/loader.svg" /> */}
      </div>
    </div>
  );
};

export default Right;
