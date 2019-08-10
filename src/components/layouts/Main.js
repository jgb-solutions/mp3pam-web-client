import React from 'react';
import { CssBaseline, Grid, Container } from '@material-ui/core';
import Player from '../Player';
import Left from '../Left';
import Right from '../Right';
import Content from '../Content';
import Header from '../../components/Header';

const styles = {
  col: {
    paddingLeft: 10,
    paddingRight: 10,
    height: window.innerHeight - 86,
    overflowY: 'scroll'
    // border: '1px solid white'
  }
};
const Main = props => {
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="lg"
        style={{
          marginBottom: 50
        }}
      >
        <Grid container>
          <Grid item sm={2} xs={12} style={{ ...styles.col, paddingTop: 10 }}>
            <Left />
          </Grid>
          <Grid
            item
            sm={8}
            xs={12}
            style={{
              ...styles.col,
              backgroundColor: '#181818',
              position: 'relative'
            }}
          >
            <Header />
            <Content style={styles.col}>{props.children}</Content>
          </Grid>
          <Grid item sm={2} xs={12} style={{ ...styles.col, paddingTop: 10 }}>
            <Right />
          </Grid>
        </Grid>
      </Container>
      <Player />
    </>
  );
};

export default Main;
