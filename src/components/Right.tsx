import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import AppStateInterface from '../interfaces/AppStateInterface';
import colors from '../utils/colors';
import Button from './Button';
import { LOG_OUT } from '../store/actions/types';

const useStyles = makeStyles(theme => ({
  container: {
    color: colors.white
  },
  logo: {
  },
  loaderSvg: {
    margin: '0 auto',
    maxWidth: '100%',
  },
}));

type Props = {
  closeDrawerRight?: (bool: boolean) => void,
};

const Right = (props: Props) => {
  const styles = useStyles();
  const dispatch = useDispatch()
  const currentUser = useSelector(({ currentUser }: AppStateInterface) => currentUser);

  const closeDrawer = () => {
    if (props.closeDrawerRight) {
      props.closeDrawerRight(false)
    }
  };

  const logout = () => {
    dispatch({ type: LOG_OUT })
    closeDrawer();
  }

  return (
    <div className={styles.container}>
      <h2>Welcome, {currentUser.data && currentUser.data.name}</h2>
      {currentUser.loggedIn && <Button onClick={logout}>Log out</Button>}
      <div className={styles.logo}>
        {/* <img className={styles.loaderSvg} alt='svg' src="/assets/images/loader.svg" /> */}
      </div>
    </div>
  );
};

export default Right;
