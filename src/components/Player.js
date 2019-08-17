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
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as playerActions from '../store/actions/playerActions';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

// import Routes from '../routes';
import colors from '../utils/colors';
import Slider from '../components/Slider';

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

class Player extends Component {
  constructor(props) {
    super(props);

    this.setUpAudio();
  }

  setUpAudio = () => {
    window.audio = this.audio = new Audio();
    this.audio.volume = this.props.playerData.volume / 100;
    this.audio.loop = this.props.playerData.repeat === 'one';
    this.audio.onended = this.onEnded;
    this.audio.ontimeupdate = this.onTimeUpdate;
    this.audio.onpause = this.onPause;
    this.audio.onplay = this.onPlay;
  };

  componentDidMount() {
    // set the last state of the audio player
    this.setPlayerFromLastState();
  }

  // componentDidUpdate(prevProps, prevState) {
    // save the current state in the redux store
    // if (prevState !== this.props.playerData) {
    //   this.props.syncState(this.props.playerData);
    // }
  // }

  setPlayerFromLastState = () => {
      if (this.props.playerData.currentTime > 0) {
      console.log('can resume');
      this.props.syncState({ isPlaying: false });
      this.prepareAudio();
      this.audio.currentTime = this.props.playerData.currentTime;
    }
  }

  onPlay = () => {
    this.props.syncState({ isPlaying: true });
  }

  onPause = () => {
    this.props.syncState({ isPlaying: false });
  }

  onTimeUpdate = () => {
    const currentTime = this.audio.currentTime;
    let duration = this.audio.duration;
    this.props.syncState({
      position: (currentTime / duration) * 100,
      elapsed: this.formatTime(currentTime),
      duration: duration > 0 ? this.formatTime(duration) : '',
      currentTime
    });
  };

  onEnded = () => {
    if (this.props.playerData.repeat === 'all') {
      this.play();
    } else {
      this.props.syncState({ isPlaying: false, position: 0 });
    }
  };

  togglePlay = () => {
    if (this.props.playerData.isPlaying) {
      this.pause();
    } else {
      this.playOrResume();
    }
  };

  playOrResume = () => {
    if (this.audio.paused && this.audio.currentTime > 0) {
      this.resume();
    } else {
      this.play();
    }
  };

  play = () => {
    this.props.syncState({ isPlaying: true });
    this.prepareAudio();
    this.audio.play().then(
      () => {
        console.log('started playing...');
      },
      error => {
        console.log('failed because ' + error);
        this.props.syncState({ isPlaying: false });
      }
    );
  };

  prepareAudio = () => {
    this.audio.src = this.props.playerData.currentTrack.play_url;
    this.audio.load();
  }
  resume = () => {
    this.audio.play();
    this.props.syncState({ isPlaying: true });
  };

  pause() {
    this.audio.pause();
    this.props.syncState({ isPlaying: false });
  }

  previous() {
    if (this.isShuffled) {
      this.playCurrentTrack(this.randomTrack());
    } else {
      let indexToPlay;
      let totalTracksIndexes = this.playedTracks.length - 1;
      let currentIndex = this.findIndex(this.currentTrack);

      if (currentIndex > 0) {
        indexToPlay = currentIndex - 1;
      } else {
        indexToPlay = totalTracksIndexes;
      }

      this.playCurrentTrack(this.playedTracks[indexToPlay]);
    }
  }

  next = () => {
    if (this.isShuffled) {
      this.playCurrentTrack(this.randomTrack());
    } else {
      let indexToPlay;
      let totalTracksIndexes = this.playedTracks.length - 1;
      let currentIndex = this.findIndex(this.currentTrack);

      if (currentIndex < totalTracksIndexes) {
        indexToPlay = currentIndex + 1;
      } else {
        indexToPlay = 0;
      }

      this.playCurrentTrack(this.playedTracks[indexToPlay]);
    }
  };

  randomTrack = () => {
    return this.playedTracks[
      Math.floor(Math.random() * this.playedTracks.length)
    ];
  };

  formatTime = seconds => {
    let minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    return minutes + ':' + seconds;
  };

  playCurrentTrack = track => {
    this.currentTrack = track;
    this.play(track.play_url);
  };

  addTrack = track => {
    if (!this.contains(track)) {
      console.log('not here');
      this.playedTracks.push(track);
    }

    console.table(this.playedTracks);
  };

  contains = currentTrack => {
    for (let i in this.playedTracks) {
      if (this.playedTracks[i] === currentTrack) {
        return true;
      }
    }

    return false;
  };

  findIndex = currentTrack => {
    return this.playedTracks.findIndex(track => {
      return this.currentTrack === track;
    });
  };

  handleSeekChange = (event, newPosition) => {
    this.audio.currentTime = (newPosition * this.audio.duration) / 100;
    this.props.syncState({ position: newPosition });
  };

  handleVolumeChange = (event, newVolume) => {
    // update the audio native player volume and also update the state
    this.audio.volume = newVolume / 100;

    this.props.syncState({ volume: newVolume });
  };

  handleQueue = () => {
    console.log('go to queue');
  };

  toggleRepeat = () => {
    this.props.syncState(({ repeat }) => {
      switch (repeat) {
        case 'none':
          return { repeat: 'all' };
        case 'all':
          this.audio.loop = true;
          return { repeat: 'one' };
        case 'one':
          this.audio.loop = false;
          return { repeat: 'none' };
        default:
          return 'all';
      }
    });
  };

  handleRepeatOne = () => {
    console.log('repeat one');
  };

  render() {
    const { classes } = this.props;
    const {
      volume,
      repeat,
      elapsed,
      duration,
      position,
      isPlaying,
      currentTrack,
    } = this.props.playerData;

    return (
      <div className={classes.container}>
        <div className={classes.player}>
          <div className={classes.posterTitle}>
            <img src={currentTrack.image} className={classes.image} alt='todo' />
            <div className={classes.titleArtist}>
              <span className={classes.title}>
                {currentTrack.title}
                <IconButton>
                  {currentTrack.favorite && (
                    <Favorite className={classes.icon} />
                  )}
                  {!currentTrack.favorite && (
                    <FavoriteBorder className={classes.icon} />
                  )}
                </IconButton>
              </span>
              <span className={classes.artist}>{currentTrack.artist.name}</span>
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
                onClick={this.togglePlay}
              >
                {isPlaying && (
                  <PauseCircleOutline
                    className={classes.icon}
                    style={{ fontSize: 42 }}
                  />
                )}
                {!isPlaying && (
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
                onClick={this.toggleRepeat}
              >
                {repeat === 'none' && <Repeat className={classes.icon} />}
                {repeat === 'all' && (
                  <Repeat
                    className={classes.icon}
                    style={{ color: colors.primary }}
                  />
                )}
                {repeat === 'one' && (
                  <RepeatOne
                    className={classes.icon}
                    style={{ color: colors.primary }}
                  />
                )}
              </IconButton>
            </div>
            <div className={classes.sliderTime}>
              <div className={classes.startTime}>{elapsed}</div>
              <div className={classes.slider}>
                <Slider
                  value={position}
                  onChange={this.handleSeekChange}
                  aria-labelledby="continuous-slider"
                />
              </div>
              <div className={classes.endTime}>{duration}</div>
            </div>
          </div>
          <div className={classes.playlistVolume}>
            <PlaylistPlayOutlined
              className={classes.icon}
              onClick={this.handleQueue}
            />
            <div className={classes.volumeIcons}>
              {volume === 0 && <VolumeMuteOutlined className={classes.icon} />}
              {volume > 0 && volume <= 70 && (
                <VolumeDownOutlined className={classes.icon} />
              )}
              {volume > 0 && volume > 70 && (
                <VolumeUpOutlined className={classes.icon} />
              )}
            </div>
            <div className={classes.volumeSliderContainer}>
              <Slider
                value={volume}
                onChange={this.handleVolumeChange}
                aria-labelledby="continuous-slider"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ playerReducer }) => ({
  playerData: playerReducer
});

const mapActionsToprops = dispatch => ({
  syncState: playerActions.syncState
});

export default connect(
  mapStateToProps,
  mapActionsToprops()
)(withRouter(withStyles(styles)(Player)));
