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

const Right = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img className={classes.loaderSvg} alt='svg' src="/assets/images/loader.svg" />
      </div>
      <div className={classes.logo}>
        <img className={classes.loaderSvg} alt='svg' src="/assets/images/loader.svg" />
      </div>
      <div className={classes.logo}>
        <img className={classes.loaderSvg} alt='svg' src="/assets/images/loader.svg" />
      </div>
      <div className={classes.logo}>
        <img className={classes.loaderSvg} alt='svg' src="/assets/images/loader.svg" />
      </div>
    </div>
  );
};

export default Right;
