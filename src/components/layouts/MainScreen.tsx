import React, { ReactNode, CSSProperties } from 'react';
import { CssBaseline, Grid, Container } from '@material-ui/core';
import Player from '../Player';
import Left from '../Left';
import Right from '../Right';
import Content from '../Content';
import Header from '../Header';

const styles = {
  col: {
    paddingLeft: 10,
    paddingRight: 10,
    height: window.innerHeight - 86,
    overflowY: 'scroll'
  }
};

const leftGridStyle = { ...styles.col, paddingTop: 10 } as CSSProperties;
const mainGridStyle = {
  ...styles.col,
  backgroundColor: '#181818',
  position: 'relative'
} as CSSProperties;
const rightGridStyle = { ...styles.col, paddingTop: 10 } as CSSProperties;

const MainScreen = (props: { style?: Object, children: ReactNode }) => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginBottom: 50 }}>
        <Grid container>
          <Grid item sm={2} xs={12} style={leftGridStyle}>
            <Left />
          </Grid>
          <Grid item sm={8} xs={12} style={mainGridStyle}>
            <Header />
            <Content style={styles.col}>{props.children}</Content>
          </Grid>
          <Grid item sm={2} xs={12} style={rightGridStyle}>
            <Right />
          </Grid>
        </Grid>
      </Container>
      <Player />
    </>
  );
};

export default MainScreen;
