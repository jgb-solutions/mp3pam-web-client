import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ViewQuilt } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  logo: {
    maxWidth: '100%',
    width: '200px'
  },
  link: {
    color: 'white',
    display: 'flex',
    textDecoration: 'none',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  linkIcon: {
    fontSize: 15,
    marginRight: 15
  },
  linkText: {
    fontSize: 15
  }
});

const menu = [
  {
    name: 'Home',
    icon: <Home />,
    to: '/'
  },
  {
    name: 'Browse',
    icon: <ViewQuilt />,
    to: '/browse'
  }
];

const Left = ({ classes }) => {
  return (
    <>
      <Link to="/">
        <img
          className={classes.logo}
          src="/assets/images/logo-trans-red-white.png"
          alt='MP3 Pam logo'
        />
      </Link>
      <p className={classes.menu}>
        {menu.map((menuItem, index) => (
          <Link key={index} to={menuItem.to} className={classes.link}>
            <span className={classes.linkIcon}>{menuItem.icon}</span>
            <span className={classes.linkText}>{menuItem.name}</span>
          </Link>
        ))}
      </p>
    </>
  );
};

export default withStyles(styles)(Left);
