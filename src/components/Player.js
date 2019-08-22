import {
  Repeat,
  Shuffle,
  SkipNext,
  Favorite,
  RepeatOne,
  SkipPrevious,
  FavoriteBorder,
  VolumeUpOutlined,
  PlayCircleOutline,
  VolumeDownOutlined,
  PauseCircleOutline,
  VolumeMuteOutlined,
  PlaylistPlayOutlined
} from '@material-ui/icons';
import React, { useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as playerActions from '../store/actions/playerActions';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

// import Routes from '../routes';
import colors from '../utils/colors';
import Slider from '../components/Slider';
import { RESUME, PAUSE, PLAY } from '../store/actions/actions';

const styles = theme => ({
  container: {
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 86,
    backgroundColor: colors.darkGrey,
    color: 'white'
  },
  player: {
    flex: 1,
    maxWidth: 1216,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
  },
  posterTitle: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
    // border: '1px solid white'
  },
  image: {
    width: 55,
    height: 55
  },
  titleArtist: {
    paddingLeft: 10
  },
  title: {
    fontSize: 11,
    fontWeight: 'bold',
    display: 'block',
    marginBottom: -10
  },
  artist: {
    fontSize: 9,
    display: 'block'
  },
  playlistVolume: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
    // border: '1px solid white'
  },
  controls: {
    flex: 2,
    display: 'flex',
    // marginTop: 0,
    flexDirection: 'column'
    // justifyContent: 'space-around'
    // border: '1px solid white'
  },
  buttons: {
    width: '37%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
    // border: '1px solid white'
  },
  sliderTime: {
    display: 'flex',
    width: '90%',
    alignSelf: 'center',
    position: 'relative'
    // border: '1px solid white'
  },
  slider: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    // alignSelf: 'flex-end'
    marginTop: -9
  },
  startTime: {
    fontSize: 10,
    position: 'absolute',
    top: -4
  },
  endTime: {
    fontSize: 10,
    position: 'absolute',
    top: -4,
    right: 0
  },
  icon: {
    fontSize: 18,
    color: colors.grey
  },
  playIcon: {
    fontSize: 48
  },
  volumeSliderContainer: {
    width: 70,
    marginLeft: 7
  },
  volumeIcons: {
    marginLeft: 15
  }
});

// Setup Audio
const audio = new Audio();
window.audio = audio;

function Player(props) {
  console.log('playerdata', props.playerData);
  const [state, setState] = useState(props.playerData);
  console.log('state', state);
  const { classes } = props;

  const onPlay = () => {
    setState(prevState => ({
      ...prevState,
      isPlaying: true
    }));
  }

  const onPause = () => {
    setState(prevState => ({
      ...prevState,
      isPlaying: false
    }));
  }

  const onTimeUpdate = () => {
    const currentTime = audio.currentTime;
    let duration = audio.duration;
    setState(prevState => ({
      ...prevState,
      position: (currentTime / duration) * 100,
      elapsed: formatTime(currentTime),
      duration: duration > 0 ? formatTime(duration) : '',
      currentTime
    }));
  };

  const onEnded = () => {
    if (state.repeat === 'all') {
        playNext();
    } else {
      setState(prevState => ({
        ...prevState,
        isPlaying: false
      }))
    }
  };

  const togglePlay = () => {
    if (state.isPlaying) {
      pause();
    } else {
      playOrResume();
    }
  };

  const playOrResume = () => {
    if (audio.paused && audio.currentTime > 0) {
      resume();
    } else {
      play();
    }
  };

  const play = () => {
    // setState(prevState => ({
    //   ...prevState, isPlaying: true
    // }));
    prepareAudio();
    audio.play().then(
      () => {
        console.log('started playing...');
      },
      error => {
        console.log('failed because ' + error);
        setState(prevState => ({
          ...prevState, isPlaying: false
        }));
      }
    );
  };

  const prepareAudio = () => {
    audio.src = state.currentTrack.play_url;
    audio.load();
  }
  const resume = () => {
    audio.play();
    setState(prevState => ({
      ...prevState,
      isPlaying: true
    }));
  };

  const pause = () => {
    audio.pause();
    setState(prevState => ({
      ...prevState,
      isPlaying: false
    }));
  }

  const previous = () => {
    if (state.isShuffled) {
      playCurrentTrack(randomTrack());
    } else {
      let indexToPlay;
      let totalTracksIndexes = state.playedTracks.length - 1;
      let currentIndex = findIndex(state.currentTrack);

      if (currentIndex > 0) {
        indexToPlay = currentIndex - 1;
      } else {
        indexToPlay = totalTracksIndexes;
      }

      playCurrentTrack(state.playedTracks[indexToPlay]);
    }
  }

  const playNext = () => {
    if (state.isShuffled) {
      playCurrentTrack(randomTrack());
    } else {
      let indexToPlay;
      let totalTracksIndexes = state.playedTracks.length - 1;
      let currentIndex = findIndex(state.currentTrack);

      if (currentIndex < totalTracksIndexes) {
        indexToPlay = currentIndex + 1;
      } else {
        indexToPlay = 0;
      }

      playCurrentTrack(state.playedTracks[indexToPlay]);
    }
  };

  const randomTrack = () => {
    return state.playedTracks[
      Math.floor(Math.random() * state.playedTracks.length)
    ];
  };

  const formatTime = seconds => {
    let minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    return minutes + ':' + seconds;
  };

  const playCurrentTrack = track => {
    state.currentTrack = track;
    play(track.play_url);
  };

  const addTrack = track => {
    if (!contains(track)) {
      console.log('not here');
      state.playedTracks.push(track);
    }

    console.table(state.playedTracks);
  };

  const contains = currentTrack => {
    for (let i in state.playedTracks) {
      if (state.playedTracks[i] === currentTrack) {
        return true;
      }
    }

    return false;
  };

  const findIndex = currentTrack => {
    return state.playedTracks.findIndex(track => {
      return currentTrack === track;
    });
  };

  const handleSeekChange = (event, newPosition) => {
    audio.currentTime = (newPosition * audio.duration) / 100;
    setState(prevState => ({
      ...prevState,
      position: newPosition
    }));
  };

  const handleVolumeChange = (event, newVolume) => {
    // update the audio native player volume and also update the state
    audio.volume = newVolume / 100;

    setState(prevState => ({
      ...prevState,
      volume: newVolume
    }));
  };

  const handleQueue = () => {
    console.log('go to queue');
  };

  const toggleRepeat = () => {
    setState((prevState) => {
      const { repeat } = prevState;
      let newRepeatVal = null;

      switch (repeat) {
        case 'none':
          this.audio.loop = false;
          newRepeatVal = 'all';
          break;
        case 'all':
          this.audio.loop = true;
          newRepeatVal = 'one';
          break;
        case 'one':
          this.audio.loop = false;
          newRepeatVal = 'none';
          break;
        default:
          newRepeatVal = 'all';
      }

      return { ...prevState, repeat: newRepeatVal };
    });
  };

  const handleRepeatOne = () => {
    console.log('repeat one');
  };

  // Audio events
  useEffect(() => {
    audio.volume = state.volume / 100;
    audio.loop = state.repeat === 'one';
    audio.onended = onEnded;
    audio.ontimeupdate = onTimeUpdate;
    audio.onpause = onPause;
    audio.onplay = onPlay;

    // set the last state of the audio player
    setPlayerFromLastState();
  }, []);

  // componentDidUpdate
  useEffect(() => {
    // play new set
    if (
      state.set.id !== props.playerData.set.id
      && props.playerData.action === PLAY
    ) {
      play();
      console.log('playlist has been updated', props.playerData.set.id);
    }

    // pausing the player
    if (
      state.action !== props.playerData.action
      && props.playerData.action === PAUSE
    ) {
      audio.pause();
      setState(prevState => ({
        ...prevState, action: PAUSE }));
      console.log('playlist is being pause for set ', props.playerData.set.id);
    }

    // Resume player
    if (
      props.playerData.action !== state.action
      && props.playerData.action === RESUME
    ) {
      audio.play();
      setState(prevState => ({
        ...prevState, action: RESUME }));
      setState(prevState => ({
        ...prevState, action: props.playerData.action }));
      console.log('resuming player');
    }
  }, []);

  useEffect(() => {
    if (props.playerData.volume !== state.volume) {
      props.syncState({ volume: state.volume });
    }

    if (props.playerData.isPlaying !== state.isPlaying) {
      props.syncState({ isPlaying: state.isPlaying });
    }

    if (props.playerData.repeat !== state.repeat) {
      props.syncState({ repeat: state.repeat });
    }

    // if (state.position !== props.position) {
    //   props.syncState({ position: state.position });
    // }

    if (props.playerData.elapsed !== state.elapsed) {
      props.syncState({ elapsed: state.elapsed });
    }

    if (props.playerData.currentTime !== state.currentTime) {
      props.syncState({ currentTime: state.currentTime });
    }

    if (props.playerData.duration !== state.duration) {
      props.syncState({ duration: state.duration });
    }

    if (props.playerData.onRepeat !== state.onRepeat) {
      props.syncState({ onRepeat: state.onRepeat });
    }

    if (props.playerData.isShuffled !== state.isShuffled) {
      props.syncState({ isShuffled: state.isShuffled });
    }
  }, []);

  const setPlayerFromLastState = () => {
    if (state.currentTime > 0) {
      prepareAudio();
      audio.currentTime = state.currentTime;
    }

    setState(prevState => ({
      ...prevState, isPlaying: false }));
  }

  return (
    <div className={classes.container}>
      <div className={classes.player}>
        <div className={classes.posterTitle}>
          {console.log('render state', state.currentTrack)}
          <img
            src={state.currentTrack.image}
            className={classes.image}
            alt={state.currentTrack.name}
          />
          <div className={classes.titleArtist}>
            <span className={classes.title}>
              {state.currentTrack.title}
              <IconButton>
                {state.currentTrack.favorite && (
                  <Favorite className={classes.icon} />
                )}
                {!state.currentTrack.favorite && (
                  <FavoriteBorder className={classes.icon} />
                )}
              </IconButton>
            </span>
            <span className={classes.artist}>{state.currentTrack.artist.name}</span>
          </div>
        </div>
        <div className={classes.controls}>
          <div className={classes.buttons}>
            <IconButton>
              <Shuffle className={classes.icon} />
            </IconButton>
            <IconButton>
              <SkipPrevious className={classes.icon} />
            </IconButton>
            <IconButton
              className={classes.playPause}
              onClick={togglePlay}
            >
              {state.isPlaying && (
                <PauseCircleOutline
                  className={classes.icon}
                  style={{ fontSize: 42 }}
                />
              )}
              {!state.isPlaying && (
                <PlayCircleOutline
                  className={classes.icon}
                  style={{ fontSize: 42 }}
                />
              )}
            </IconButton>
            <IconButton>
              <SkipNext className={classes.icon} />
            </IconButton>
            <IconButton
              className={classes.repeat}
              onClick={toggleRepeat}
            >
              {state.repeat === 'none' && <Repeat className={classes.icon} />}
              {state.repeat === 'all' && (
                <Repeat
                  className={classes.icon}
                  style={{ color: colors.primary }}
                />
              )}
              {state.repeat === 'one' && (
                <RepeatOne
                  className={classes.icon}
                  style={{ color: colors.primary }}
                />
              )}
            </IconButton>
          </div>
          <div className={classes.sliderTime}>
            <div className={classes.startTime}>{state.elapsed}</div>
            <div className={classes.slider}>
              <Slider
                value={state.position}
                onChange={handleSeekChange}
                aria-labelledby="continuous-slider"
              />
            </div>
            <div className={classes.endTime}>{state.duration}</div>
          </div>
        </div>
        <div className={classes.playlistVolume}>
          <PlaylistPlayOutlined
            className={classes.icon}
            onClick={handleQueue}
          />
          <div className={classes.volumeIcons}>
            {state.volume === 0 && <VolumeMuteOutlined className={classes.icon} />}
            {state.volume > 0 && state.volume <= 70 && (
              <VolumeDownOutlined className={classes.icon} />
            )}
            {state.volume > 0 && state.volume > 70 && (
              <VolumeUpOutlined className={classes.icon} />
            )}
          </div>
          <div className={classes.volumeSliderContainer}>
            <Slider
              value={state.volume}
              onChange={handleVolumeChange}
              aria-labelledby="continuous-slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ player }) => ({
    playerData: player,
  })
)(withRouter(withStyles(styles)(Player)));
