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
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as playerActions from "../store/actions/playerActions";
import IconButton from "@material-ui/core/IconButton";
import {
	withStyles,
	createStyles,
	Theme,
	WithStyles
} from "@material-ui/core/styles";

// import Routes from '../routes';
import colors from "../utils/colors";
import Slider from "./Slider";
import { RESUME, PAUSE, PLAY } from "../store/actions/actions";
import PlayerInterface from "../interfaces/PlayerInterface";
import { debounce } from "lodash-es";

const styles = (theme: Theme) =>
	createStyles({
		container: {
			display: "flex",
			position: "fixed",
			bottom: 0,
			left: 0,
			right: 0,
			height: 86,
			backgroundColor: colors.darkGrey,
			color: "white"
		},
		player: {
			flex: 1,
			maxWidth: 1216,
			marginLeft: "auto",
			marginRight: "auto",
			display: "flex",
			justifyContent: "space-between"
		},
		posterTitle: {
			flex: 1,
			display: "flex",
			alignItems: "center"
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
			fontWeight: "bold",
			display: "block",
			marginBottom: -10
		},
		artist: {
			fontSize: 9,
			display: "block"
		},
		playlistVolume: {
			flex: 1,
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center"
			// border: '1px solid white'
		},
		controls: {
			flex: 2,
			display: "flex",
			// marginTop: 0,
			flexDirection: "column"
			// justifyContent: 'space-around'
			// border: '1px solid white'
		},
		buttons: {
			width: "37%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			alignSelf: "center"
			// border: '1px solid white'
		},
		sliderTime: {
			display: "flex",
			width: "90%",
			alignSelf: "center",
			position: "relative"
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
			position: "absolute",
			top: -4
		},
		endTime: {
			fontSize: 10,
			position: "absolute",
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

interface Props extends WithStyles<typeof styles> {
	syncState(state: any): void;
	storePlayerData: PlayerInterface;
}

function Player(props: Props) {
	const { classes, storePlayerData, syncState } = props;
	const [state, setState] = useState<PlayerInterface>({
		...storePlayerData,
		isPlaying: false,
		action: PAUSE
	});

	// Audio events for when the component first mounts
	useEffect(() => {
		audio.volume = state.volume / 100;
		audio.loop = state.repeat === "one" || state.repeat === "all";
		audio.onended = onEnded;
		audio.ontimeupdate = onTimeUpdate;
		audio.onpause = onPause;
		audio.onplay = onPlay;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// set the last state of the audio player
	useEffect(() => {
		console.log("udpating from last state");
		if (state.currentTime > 0) {
			prepareAudio();
			audio.currentTime = state.currentTime;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onPlay = () => {
		setState(prevState => ({
			...prevState,
			isPlaying: true
		}));
	};

	const onPause = () => {
		setState(prevState => ({
			...prevState,
			isPlaying: false
		}));
	};

	const onTimeUpdate = () => {
		const currentTime = audio.currentTime;
		let duration = audio.duration;
		setState(prevState => ({
			...prevState,
			position: (currentTime / duration) * 100,
			elapsed: formatTime(currentTime),
			duration: duration > 0 ? formatTime(duration) : "",
			currentTime
		}));
	};

	const onEnded = () => {
		console.log("onEnd called", state.repeat);
		console.log(state.repeat);
		// if (state.repeat === "all") {
		// 	playNext();
		// }
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
		setState(prevState => ({
			...prevState,
			isPlaying: true
		}));

		prepareAudio();
		audio.play().then(
			() => {
				console.log("started playing...");
			},
			error => {
				console.log("failed because " + error);
				setState(prevState => ({
					...prevState,
					isPlaying: false
				}));
			}
		);
	};

	const prepareAudio = () => {
		audio.src = state.currentTrack.play_url;
		audio.load();
	};

	const resume = () => {
		audio.play();
		setState(prevState => ({
			...prevState,
			isPlaying: true,
			action: RESUME
		}));
	};

	const pause = () => {
		audio.pause();
		setState(prevState => ({
			...prevState,
			isPlaying: false,
			action: PAUSE
		}));
	};

	const previous = () => {
		// if (state.isShuffled) {
		//   playOrResume();
		// } else {
		//   let indexToPlay;
		//   let totalTracksIndexes = state.playedTracks.length - 1;
		//   let currentIndex = findIndex(state.currentTrack);
		//   if (currentIndex > 0) {
		//     indexToPlay = currentIndex - 1;
		//   } else {
		//     indexToPlay = totalTracksIndexes;
		//   }
		//   playOrResume();
		// }
	};

	const playNext = () => {
		// if (state.isShuffled) {
		//   playCurrentTrack(randomTrack());
		// } else {
		//   let indexToPlay;
		//   let totalTracksIndexes = state.playedTracks.length - 1;
		//   let currentIndex = findIndex(state.currentTrack);

		//   if (currentIndex < totalTracksIndexes) {
		//     indexToPlay = currentIndex + 1;
		//   } else {
		//     indexToPlay = 0;
		//   }

		//   playCurrentTrack(state.playedTracks[indexToPlay]);
		// }
		console.log("playing next track");
		playOrResume();
	};

	const randomTrack = () => {
		// return state.playedTracks[
		// 	Math.floor(Math.random() * state.playedTracks.length)
		// ];
	};

	const formatTime = (seconds: number) => {
		let minutes: number = Math.floor(seconds / 60);
		let sMinutes = minutes >= 10 ? minutes : "0" + minutes;
		seconds = Math.floor(seconds % 60);
		let sSeconds = seconds >= 10 ? seconds : "0" + seconds;
		return sMinutes + ":" + sSeconds;
	};

	const handleSeekChange = (event: any, newPosition: number) => {
		audio.currentTime = (newPosition * audio.duration) / 100;
		setState(prevState => ({
			...prevState,
			position: newPosition
		}));
	};

	const handleVolumeChange = (event: any, newVolume: number) => {
		// update the audio native player volume and also update the state
		audio.volume = newVolume / 100;

		setState(prevState => ({
			...prevState,
			volume: newVolume
		}));
	};

	const handleQueue = () => {
		console.log("go to queue");
	};

	const toggleRepeat = () => {
		setState(prevState => {
			let newRepeatVal;

			switch (prevState.repeat) {
				case "none":
					newRepeatVal = "all";
					break;
				case "all":
					newRepeatVal = "one";
					break;
				case "one":
					newRepeatVal = "none";
					break;
			}

			return { ...prevState, repeat: newRepeatVal };
		});
	};

	// update playing when the store state changes  // componentDidUpdate
	useEffect(() => {
		console.log(`wanting to ${storePlayerData.action}`);
		// play new set
		if (
			state.list.id !== storePlayerData.list.id &&
			storePlayerData.action === PLAY
		) {
			play();
			setState(prevState => ({
				...prevState,
				action: PLAY
			}));
			console.log("playlist has been updated", storePlayerData.list.id);
		}

		// pausing the player
		if (storePlayerData.action === PAUSE) {
			audio.pause();
			setState(prevState => ({
				...prevState,
				action: PAUSE
			}));
			console.log("playlist is being pause for set ", storePlayerData.list.id);
		}

		// Resume player
		if (
			storePlayerData.list.id === state.list.id
			&& storePlayerData.action === RESUME
		) {
			console.log("resuming player");
			console.log(storePlayerData.action);
			audio.play();
			// setState(prevState => ({
			// 	...prevState,
			// 	action: RESUME
			// }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storePlayerData.list, storePlayerData.action]);

	// update the store state when some local states change
	useEffect(() => {
		syncState({ volume: state.volume });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.volume]);

	useEffect(() => {
		syncState({ isPlaying: state.isPlaying });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.isPlaying]);

	useEffect(() => {
		const { repeat } = state;
		console.log(`repeat state is ${repeat} and audio.loop is ${audio.loop}`);
		audio.loop = repeat === "all" || repeat === "one";
		syncState({ repeat: state.repeat });
		console.log(`repeat state is ${repeat} and audio.loop is ${audio.loop}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.repeat]);

	// useEffect(() => {
	// 	debounce(() => {
	// 		syncState({ position: state.position });
	// 	}, 1000)();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [state.position]);

	useEffect(() => {
		debounce(() => {
			syncState({ elapsed: state.elapsed, currentTime: state.currentTime });
		}, 1000)();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.elapsed]);

	// useEffect(() => {
	// 	debounce(() => {
	// 		syncState({ currentTime: state.currentTime });
	// 	}, 1000)();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [state.currentTime]);

	useEffect(() => {
		syncState({ duration: state.duration });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.duration]);

	useEffect(() => {
		syncState({ repeat: state.repeat });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.repeat]);

	useEffect(() => {
		syncState({ isShuffled: state.isShuffled });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.isShuffled]);

	return (
		<div className={classes.container}>
			<div className={classes.player}>
				<div className={classes.posterTitle}>
					<img
						src={state.currentTrack.image}
						className={classes.image}
						alt={state.currentTrack.title}
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
						<span className={classes.artist}>
							{state.currentTrack.artist.name}
						</span>
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
							// className={classes.playPause}
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
						<IconButton onClick={toggleRepeat}>
							{state.repeat === "none" && <Repeat className={classes.icon} />}
							{state.repeat === "all" && (
								<Repeat
									className={classes.icon}
									style={{ color: colors.primary }}
								/>
							)}
							{state.repeat === "one" && (
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
						{state.volume === 0 && (
							<VolumeMuteOutlined className={classes.icon} />
						)}
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
}

export default connect(
	({ player }: any) => ({
		storePlayerData: player
	}),
	{
		syncState: playerActions.syncState
	}
)(withStyles(styles)(Player));
