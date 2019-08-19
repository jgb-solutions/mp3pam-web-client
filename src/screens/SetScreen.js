// @flow
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, darken } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as playerActions from '../store/actions/playerActions';
import colors from '../utils/colors';
import { Button } from '@material-ui/core';

const Set = props => {
  const set = [{
    title: 'Really great News',
    detail:
      "Cat, 'if you don't explain it is right?' 'In my youth,' Father William replied to his ear. Alice considered a little, and then said 'The fourth.' 'Two days wrong!' sighed the Lory, as soon as she.",
    lyrics:
      "She went in without knocking, and hurried off at once, while all the jurymen are back in a minute or two, they began moving about again, and looking at them with large round eyes, and half believed herself in Wonderland, though she knew that it might tell her something worth hearing. For some minutes it puffed away without speaking, but at the bottom of the court. 'What do you mean \"purpose\"?' said Alice. 'Then you should say what you would seem to come once a week: HE taught us Drawling, Stretching, and Fainting in Coils.' 'What was THAT like?' said Alice. 'Well, I never heard of \"Uglification,\"' Alice ventured to ask. 'Suppose we change the subject,' the March Hare and the Mock Turtle, 'but if they do, why then they're a kind of serpent, that's all I can say.' This was such a puzzled expression that she was now only ten inches high, and her eyes filled with tears again as she could. 'The game's going on between the executioner, the King, 'or I'll have you executed, whether you're a.",
    url: '/api/v1/musics/42139505',
    play_count: 0,
    play_url: 'https://audios.mp3pam.com/OMVR-Bad-News.mp3',
    download_count: 0,
    download_url: '/t/42139505',
    image: 'https://images.mp3pam.com/demo/artist3.jpg',
    favorite: true,
    category: {
      name: 'Konpa',
      slug: 'konpa',
      url: '/api/v1/categories/konpa'
    },
  }];

  return (
    <>
      <h1>{ set[0].title }</h1>
      <Button variant="contained" color="primary" onClick={() => {props.playSet(set)}}>
        Primary
      </Button>
      <img alt={set[0].title} src={set[0].image} />
    </>
  );
}

const mapStateToProps = ({ playerReducer }) => ({
  playerData: playerReducer
});

const mapActionsToprops = dispatch => ({
  playSet: playerActions.playSet,
  pauseSet: playerActions.pauseSet
});

export default connect(
  null,
  mapActionsToprops()
)(withRouter((Set)));