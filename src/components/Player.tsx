import {
	Repeat,
	Shuffle,
	SkipNext,
	RepeatOne,
	SkipPrevious,
	VolumeUpOutlined,
	PlayCircleOutline,
	VolumeDownOutlined,
	PauseCircleOutline,
	VolumeMuteOutlined,
	PlaylistPlayOutlined
} from "@material-ui/icons";
import { get } from "lodash-es";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { withRouter, RouteComponentProps } from "react-router-dom";

import Heart from "./Heart";
import Slider from "./Slider";
import Routes from '../routes';
import { debounce } from "../utils/helpers";
import { ALL, ONE, NONE } from '../utils/constants';
import TrackInterface from "../interfaces/TrackInterface";
import PlayerInterface from "../interfaces/PlayerInterface";
import * as playerActions from "../store/actions/playerActions";
import { RESUME, PAUSE, PLAY, PLAY_TRACK, PAUSE_TRACK, RESUME_TRACK } from "../store/actions/actions";
import AppStateInterface from "../interfaces/AppStateInterface";
import PlayerStyle from "./PlayerStyle";
import colors from "../utils/colors";

// Setup Audio
const audio = new Audio();
let syncStateTimeoutId: number;

interface Props {
	syncState(state: any): void;
	storePlayerData: PlayerInterface;
}

function Player(props: Props & RouteComponentProps) {
	const { storePlayerData, syncState } = props;
	const classes = PlayerStyle();
	const [state, setState] = useState<PlayerInterface>({
		...storePlayerData,
		isPlaying: false,
		action: PAUSE
	});

	// Audio events for when the component first mounts
	useEffect(() => {
		audio.volume = state.volume / 100;
		audio.loop = state.repeat === ONE;
		audio.onended = onEnded;
		audio.ontimeupdate = onTimeUpdate;
		audio.onpause = onPause;
		audio.onplay = onPlay;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// set the last state of the audio player
	useEffect(() => {
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
		const tracks = get(state.list, 'tracks', [])
		const { repeat } = state;

		const currentTrack = state.currentTrack
		if (!currentTrack) return;
		const currentTrackIndex = findIndex(currentTrack, tracks)
		const totalTracksIndexes = tracks.length - 1;

		if (
			tracks.length > 1 && repeat === ALL
		) {
			playNext();
		}

		if (
			tracks.length > 1 && repeat === NONE &&
			currentTrackIndex < totalTracksIndexes
		) {
			playNext();
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
		if (!state.currentTrack) return;

		setState(prevState => ({
			...prevState,
			isPlaying: true
		}));

		prepareAudio();
		audio.play().then(
			() => {
				// console.log("started playing...");
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
		if (!state.currentTrack) return;
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

	const playPrevious = () => {
		const tracks = get(state.list, 'tracks', [])
		if (state.isShuffled) {
			getRandomTrack(tracks)
			play();
		} else {
			if (tracks.length > 1) {
				let indexToPlay: number;
				let totalTracksIndexes = tracks.length - 1;

				if (!state.currentTrack) return;
				let currentIndex = findIndex(state.currentTrack, tracks);
				if (currentIndex > 0) {
					indexToPlay = currentIndex - 1;
				} else {
					indexToPlay = totalTracksIndexes;
				}

				setState(prevState => ({
					...prevState,
					currentTrack: tracks[indexToPlay]
				}))
			} else {
				play();
			}
		}
	};

	const playNext = () => {
		const tracks = get(state.list, 'tracks', [])
		if (state.isShuffled) {
			getRandomTrack(tracks)
			play();
		} else {
			if (tracks.length > 1) {
				let indexToPlay: number;
				let totalTracksIndexes = tracks.length - 1;

				if (!state.currentTrack) return;
				let currentIndex = findIndex(state.currentTrack, tracks);

				if (currentIndex < totalTracksIndexes) {
					indexToPlay = currentIndex + 1;
				} else {
					indexToPlay = 0;
				}

				setState(prevState => ({
					...prevState,
					currentTrack: tracks[indexToPlay]
				}))
			} else {
				play();
			}
		}
	};

	const findIndex = (track: TrackInterface, trackList: TrackInterface[]): number => {
		return trackList.findIndex(item => item.id === track.id);
	}

	const getRandomTrack = (tracks: TrackInterface[]) => {
		const randomTrack = tracks[
			Math.floor(Math.random() * tracks.length)
		];

		setState(prevState => ({
			...prevState,
			currentTrack: randomTrack
		}))
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
		props.history.push(Routes.pages.queue);
	};

	const toggleRepeat = () => {
		setState(prevState => {
			let newRepeatVal;

			switch (prevState.repeat) {
				case NONE:
					newRepeatVal = ALL;
					break;
				case ALL:
					newRepeatVal = ONE;
					break;
				case ONE:
					newRepeatVal = NONE;
					break;
			}

			return { ...prevState, repeat: newRepeatVal };
		});
	};

	const toggleShuffle = () => {
		setState(prevState => ({
			...prevState,
			isShuffled: !prevState.isShuffled
		}));
	}

	// update playing when the store state changes
	useEffect(() => {
		// play new set
		if (
			state.list.id !== storePlayerData.list.id &&
			storePlayerData.action === PLAY
		) {
			const currentTrack = get(storePlayerData, 'list.tracks')[0]

			setState(prevState => ({
				...prevState,
				action: PLAY,
				list: storePlayerData.list,
				currentTrack
			}));
		}

		// pausing the player
		if (storePlayerData.action === PAUSE) {
			audio.pause();
			setState(prevState => ({
				...prevState,
				action: PAUSE
			}));
		}

		// Resume player
		if (
			storePlayerData.list.id === state.list.id
			&& storePlayerData.action === RESUME
		) {
			audio.play();
			setState(prevState => ({
				...prevState,
				action: RESUME
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storePlayerData.list, storePlayerData.action, storePlayerData.updateHack]);

	// Play, Pause and resume track
	useEffect(() => {
		switch (storePlayerData.action) {
			case PLAY_TRACK:
				setState(prevState => ({
					...prevState,
					action: PLAY_TRACK,
					currentTrack: get(storePlayerData, 'track')
				}));
				break;
			case PAUSE_TRACK:
				pause();
				setState(prevState => ({
					...prevState,
					action: PAUSE_TRACK,
				}));
				break;
			case RESUME_TRACK:
				resume();
				setState(prevState => ({
					...prevState,
					action: RESUME_TRACK,
				}));
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storePlayerData.action, storePlayerData.updateHack]);

	// update the store state when some local states change
	useEffect(() => {
		syncState({ volume: state.volume });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.volume]);

	// play current track after it has been updated
	useEffect(() => {
		if (get(storePlayerData, 'currentTrack.id') !== get(state, 'currentTrack.id')) {
			syncState({ currentTrack: state.currentTrack });
			play();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.currentTrack]);

	useEffect(() => {
		syncState({ isPlaying: state.isPlaying });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.isPlaying]);

	useEffect(() => {
		const { repeat } = state;
		audio.loop = repeat === ONE;
		syncState({ repeat });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.repeat]);

	useEffect(() => {
		debounce(() => {
			syncState({ elapsed: state.elapsed, currentTime: state.currentTime });
		}, 1000, syncStateTimeoutId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.elapsed]);

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
						src={state.currentTrack ? state.currentTrack.image : '/assets/images/loader.svg'}
						className={classes.image}
						alt={state.currentTrack && state.currentTrack.title}
					/>
					<div className={classes.titleArtist}>
						<span className={classes.title}>
							{state.currentTrack && state.currentTrack.title}
							<Heart />
						</span>
						<span className={classes.artist}>
							{state.currentTrack && state.currentTrack.artist.name}
						</span>
					</div>
				</div>
				<div className={classes.controls}>
					<div className={classes.buttons}>
						<IconButton onClick={toggleShuffle}>
							{!state.isShuffled && <Shuffle className={classes.icon} />}
							{state.isShuffled && (
								<Shuffle className={classes.icon}
									style={{ color: colors.primary }}
								/>
							)}
						</IconButton>
						<IconButton onClick={playPrevious}>
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
						<IconButton onClick={playNext}>
							<SkipNext className={classes.icon} />
						</IconButton>
						<IconButton onClick={toggleRepeat}>
							{state.repeat === NONE && <Repeat className={classes.icon} />}
							{state.repeat === ALL && (
								<Repeat
									className={classes.icon}
									style={{ color: colors.primary }}
								/>
							)}
							{state.repeat === ONE && (
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
					<IconButton onClick={handleQueue}>
						<PlaylistPlayOutlined
							className={classes.icon}
						/>
					</IconButton>
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
	({ player }: AppStateInterface) => ({
		storePlayerData: player
	}),
	{
		syncState: playerActions.syncState
	}
)(withRouter(Player));
