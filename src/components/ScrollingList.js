import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import { animated, useSpring } from 'react-spring';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import colors from '../utils/colors';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 20
  },
  list: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto'
  },
  item: {
    width: 180,
    marginRight: 21
  },
  link: { color: '#fff', textDecoration: 'none' },
  listHeader: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: 3,
    paddingHorizontal: 0,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  listTitle: {
    margin: 0,
    fontSize: 16
  },
  img: {
    width: 180
  },
  title: {
    margin: 0,
    fontSize: 14,
    color: colors.white,
  },
  details: {
    fontSize: 13,
    color: '#9d9d9d',
    marginTop: 5,
    marginBottom: 0
  }
}));

const ScrollingList = props => {
  const { data, listTitle } = props;
  const styles = useStyles();
  let domElement = null;

  const scroll = dir => {
    const distance = 400;
    if (dir === 'left') {
      domElement.scrollLeft -= distance;
    } else {
      domElement.scrollLeft += distance;
    }

    console.log('clientWidth', domElement.clientWidth);
    console.log('offsetWidth', domElement.offsetWidth);
    console.log('scrollWidth', domElement.scrollWidth);
  };

  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>
        <Link to="/c/konpa" className={styles.link}>
          <h2 className={styles.listTitle}>{listTitle || 'Konpa'}</h2>
        </Link>
        <div className={styles.arrows}>
          <KeyboardArrowLeft onClick={() => scroll('left')} />
          &nbsp;
          <KeyboardArrowRight onClick={() => scroll('right')} />
        </div>
      </div>
      <div
        className={styles.list}
        ref={el => {
          domElement = el;
        }}
      >
        {data.map(music => (
          <div key={music.title} className={styles.item}>
            <div className={styles.imgContainer}>
              <img src={music.img} alt={music.title} className={styles.img} />
            </div>
            <h3 className={styles.title}>{music.title}</h3>
            <p className={styles.details}>
              Drift away with child <br />
              ambient music. <br />
              926.457 FOLLOWERS
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingList;
