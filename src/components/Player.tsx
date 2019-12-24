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
} from "@material-ui/icons"
import MoreIcon from '@material-ui/icons/MoreVert'
import { get } from "lodash-es"
import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from "react"
import IconButton from "@material-ui/core/IconButton"
import { useHistory } from "react-router-dom"
import { Drawer, Slide } from "@material-ui/core"

import Slider from "./Slider"
import Routes from '../routes'
import { debounce } from "../utils/helpers"
import { ALL, ONE, NONE, SECONDS_TO_UPDATE_PLAY_COUNT } from '../utils/constants'
import { SoundInterface } from "../interfaces/ListInterface"
import PlayerInterface from "../interfaces/PlayerInterface"
import * as playerActions from "../store/actions/playerActions"
import {
	RESUME, PAUSE, PLAY, PLAY_SOUND, PAUSE_SOUND, RESUME_SOUND, PLAY_NEXT, ADD_TO_QUEUE
} from "../store/actions/player_action_types"
import AppStateInterface from "../interfaces/AppStateInterface"
import PlayerStyle from "../styles/PlayerStyle"
import colors from "../utils/colors"
import useUpdatePlayCount from "../hooks/useUpdatePlayCount"

// Setup Audio
const audio = new Audio()
let syncStateTimeoutId: number

export default function Player() {
	const styles = PlayerStyle()
	const history = useHistory()
	const dispatch = useDispatch()
	const { updatePlayCount } = useUpdatePlayCount()
	const [loggedHash, setLoggedHash] = useState('')
	const [drawerOPen, setDrawerOpen] = useState(false)
	const storePlayerData = useSelector((appState: AppStateInterface) => appState.player)
	const syncState = (state: any) => dispatch(playerActions.syncState(state))
	const [state, setState] = useState<PlayerInterface>({
		...storePlayerData,
		isPlaying: false,
		action: PAUSE
	})

	// Audio events for when the component first mounts
	useEffect(() => {
		audio.volume = state.volume / 100
		audio.loop = state.repeat === ONE
		// audio.onended = onEnded;
		audio.ontimeupdate = onTimeUpdate
		audio.onpause = onPause
		audio.onplay = onPlay

		// set the last state of the audio player
		if (state.currentTime > 0) {
			prepareAudio()
			audio.currentTime = state.currentTime
		}
		// eslint-disable-next-line
	}, [])

	const onPlay = () => {
		setState(prevState => ({
			...prevState,
			isPlaying: true
		}))
	}

	const onPause = () => {
		setState(prevState => ({
			...prevState,
			isPlaying: false
		}))
	}

	const onTimeUpdate = () => {
		const currentTime = audio.currentTime
		let duration = audio.duration
		setState(prevState => ({
			...prevState,
			position: (currentTime / duration) * 100,
			elapsed: formatTime(currentTime),
			duration: duration > 0 ? formatTime(duration) : "",
			currentTime
		}))
	}

	const onEnded = () => {
		const sounds = state.queueList
		const { repeat } = state

		const currentSound = state.currentSound
		if (!currentSound) return

		const currentSoundIndex = findIndex(currentSound, sounds)
		const totalSoundsIndexes = sounds.length - 1

		if (
			sounds.length > 1 && repeat === ALL
		) {
			playNext()
		}

		if (
			sounds.length > 1 && repeat === NONE &&
			currentSoundIndex < totalSoundsIndexes
		) {
			playNext()
		}
	}

	const togglePlay = () => {
		if (state.isPlaying) {
			pause()
		} else {
			playOrResume()
		}
	}

	const playOrResume = () => {
		if (audio.paused && audio.currentTime > 0) {
			resume()
		} else {
			play()
		}
	}

	const play = () => {
		if (!state.currentSound) return

		setLoggedHash('')

		const currentPlayingIndex = findIndex(
			get(state, 'currentSound'),
			state.queueList
		)

		syncState({ currentPlayingIndex })

		setState(prevState => ({
			...prevState,
			isPlaying: true,
		}))

		prepareAudio()

		audio.play().then(
			() => {
				// console.log("started playing...");
			},
			error => {
				console.log("failed because " + error)
				setState(prevState => ({
					...prevState,
					isPlaying: false
				}))
			}
		)
	}

	const prepareAudio = () => {
		if (!state.currentSound) return
		audio.src = state.currentSound.play_url
		// audio.load();
	}

	const resume = () => {
		audio.play()

		if (state.currentTime < SECONDS_TO_UPDATE_PLAY_COUNT) {
			setLoggedHash('')
		}

		setState(prevState => ({
			...prevState,
			isPlaying: true,
			action: RESUME
		}))
	}

	const pause = () => {
		audio.pause()
		setState(prevState => ({
			...prevState,
			isPlaying: false,
			action: PAUSE
		}))
	}

	const playPrevious = () => {
		const sounds = state.queueList
		if (state.isShuffled) {
			getRandomSound(sounds)
			play()
		} else {
			if (sounds.length > 1) {
				let indexToPlay: number
				let totalSoundsIndexes = state.queueList.length - 1

				if (!state.currentSound) return
				let currentIndex = findIndex(state.currentSound, sounds)
				if (currentIndex > 0) {
					indexToPlay = currentIndex - 1
				} else {
					indexToPlay = totalSoundsIndexes
				}

				setState(prevState => ({
					...prevState,
					currentSound: sounds[indexToPlay]
				}))
			} else {
				play()
			}
		}
	}

	const playNext = () => {
		const sounds = state.queueList
		if (state.isShuffled) {
			getRandomSound(sounds)
			play()
		} else {
			if (sounds.length > 1) {
				let indexToPlay: number
				let totalSoundsIndexes = sounds.length - 1

				if (!state.currentSound) return
				let currentIndex = findIndex(state.currentSound, sounds)

				if (currentIndex < totalSoundsIndexes) {
					indexToPlay = currentIndex + 1
				} else {
					indexToPlay = 0
				}

				setState(prevState => ({
					...prevState,
					currentSound: sounds[indexToPlay]
				}))
			} else {
				play()
			}
		}
	}

	const findIndex = (sound: any, soundList: any[]): number => {
		return soundList.findIndex((item: SoundInterface) => item.hash === sound.hash)
	}

	const getRandomSound = (sounds: SoundInterface[]) => {
		const randomSound = sounds[
			Math.floor(Math.random() * sounds.length)
		]

		setState(prevState => ({
			...prevState,
			currentSound: randomSound
		}))
	}

	const formatTime = (seconds: number) => {
		let minutes: number = Math.floor(seconds / 60)
		let sMinutes = minutes >= 10 ? minutes : "0" + minutes
		seconds = Math.floor(seconds % 60)
		let sSeconds = seconds >= 10 ? seconds : "0" + seconds
		return sMinutes + ":" + sSeconds
	}

	const handleSeekChange = (event: any, newPosition: number) => {
		audio.currentTime = (newPosition * audio.duration) / 100
		setState(prevState => ({
			...prevState,
			position: newPosition
		}))
	}

	const handleVolumeChange = (event: any, newVolume: number) => {
		// update the audio native player volume and also update the state
		audio.volume = newVolume / 100

		setState(prevState => ({
			...prevState,
			volume: newVolume
		}))
	}

	const handleQueue = () => {
		history.push(Routes.user.library.queue)
	}

	const toggleRepeat = () => {
		setState(prevState => {
			let newRepeatVal

			switch (prevState.repeat) {
				case NONE:
					newRepeatVal = ALL
					break
				case ALL:
					newRepeatVal = ONE
					break
				case ONE:
					newRepeatVal = NONE
					break
			}

			return { ...prevState, repeat: newRepeatVal }
		})
	}

	const toggleShuffle = () => {
		setState(prevState => ({
			...prevState,
			isShuffled: !prevState.isShuffled
		}))
	}

	// update playing when the store state changes
	useEffect(() => {
		// play new list
		if (
			get(storePlayerData, 'list.hash') !== get(state, 'list.hash')
			&& storePlayerData.action === PLAY
		) {
			setState(prevState => ({
				...prevState,
				action: PLAY,
				list: storePlayerData.list,
				queueList: get(storePlayerData, 'list.sounds'),
				currentSound: get(storePlayerData, 'sound') || get(storePlayerData, 'list.sounds')[0]
			}))
		}

		// pausing the player
		if (storePlayerData.action === PAUSE) {
			audio.pause()
			setState(prevState => ({
				...prevState,
				action: PAUSE
			}))
		}

		// Resume player
		if (
			get(storePlayerData, 'list.hash') === get(state, 'list.hash')
			&& storePlayerData.action === RESUME
		) {
			audio.play()
			setState(prevState => ({
				...prevState,
				action: RESUME
			}))
		}

		if (storePlayerData.action === PLAY_NEXT) {
			const currentSound = get(state, 'currentSound')
			const stateSoundList: any[] = get(state, 'list.sounds')

			if (currentSound) {
				const index = findIndex(currentSound, stateSoundList)

				let newSoundList: any[] = [...stateSoundList]

				newSoundList.splice(index + 1, 0, ...storePlayerData.soundList)


				setState(prevState => ({
					...prevState,
					action: PLAY_NEXT,
					queueList: newSoundList,
					soundList: []
				}))
			}
		}

		if (storePlayerData.action === ADD_TO_QUEUE) {
			setState(prevState => ({
				...prevState,
				action: ADD_TO_QUEUE,
				queueList: [...state.queueList, ...storePlayerData.soundList],
				soundList: []
			}))
		}
		// eslint-disable-next-line
	}, [storePlayerData.list, storePlayerData.action, storePlayerData.updateHack])

	// Play, Pause and resume sound
	useEffect(() => {
		switch (storePlayerData.action) {
			case PLAY_SOUND:
				console.log('called play sound')
				console.log(storePlayerData.sound)
				setState(prevState => ({
					...prevState,
					action: PLAY_SOUND,
					currentSound: get(storePlayerData, 'sound')
				}))
				break
			case PAUSE_SOUND:
				pause()
				setState(prevState => ({
					...prevState,
					action: PAUSE_SOUND,
				}))
				break
			case RESUME_SOUND:
				resume()
				setState(prevState => ({
					...prevState,
					action: RESUME_SOUND,
				}))
				break
		}
		// eslint-disable-next-line
	}, [storePlayerData.action, storePlayerData.updateHack])

	// update the store state when some local states change
	useEffect(() => {
		syncState({ volume: state.volume })
		// eslint-disable-next-line
	}, [state.volume])

	// Update store queue list
	useEffect(() => {
		syncState({ queueList: state.queueList })
		// eslint-disable-next-line
	}, [state.queueList])

	// update the store state when some local states change
	useEffect(() => {
		if (state.currentSound) {
			const { hash, type } = state.currentSound

			if (
				state.isPlaying &&
				!loggedHash &&
				Math.floor(state.currentTime) === SECONDS_TO_UPDATE_PLAY_COUNT
			) {
				setLoggedHash(hash)
				updatePlayCount({ hash, type })
			}
		}
		// eslint-disable-next-line
	}, [state.currentTime])

	// play current sound after it has been updated
	useEffect(() => {
		if (get(storePlayerData, 'currentSound.hash') !== get(state, 'currentSound.hash')) {
			syncState({ currentSound: state.currentSound })
			play()
		}
		// eslint-disable-next-line
	}, [state.currentSound])

	useEffect(() => {
		syncState({ isPlaying: state.isPlaying })
		// eslint-disable-next-line
	}, [state.isPlaying])

	useEffect(() => {
		const { repeat } = state
		audio.loop = repeat === ONE
		syncState({ repeat })
		// eslint-disable-next-line
	}, [state.repeat])

	useEffect(() => {
		debounce(() => {
			syncState({ elapsed: state.elapsed, currentTime: state.currentTime })
		}, 1000, syncStateTimeoutId)

		if (state.elapsed === state.duration) {
			onEnded()
		}

		// eslint-disable-next-line
	}, [state.elapsed])

	useEffect(() => {
		syncState({ duration: state.duration })
		// eslint-disable-next-line
	}, [state.duration])

	useEffect(() => {
		syncState({ repeat: state.repeat })
		// eslint-disable-next-line
	}, [state.repeat])

	useEffect(() => {
		syncState({ isShuffled: state.isShuffled })
		// eslint-disable-next-line
	}, [state.isShuffled])

	return (
		<Slide direction="up" timeout={500} in={!!state.currentSound} mountOnEnter unmountOnExit>
			<div className={styles.container}>
				<div className={styles.player}>
					<div className={styles.posterTitle} onClick={() => {
						const type = get(state, 'currentSound.type')
						const hash = get(state, 'currentSound.hash')
						let route: string

						switch (type) {
							case 'track':
								route = Routes.track.detailPage(hash)
								history.push(route)
								break
							case 'episode':
								route = Routes.episode.detailPage(hash)
								history.push(route)
								break
						}
					}}>
						<img
							src={state.currentSound ? state.currentSound.image : '/assets/images/loader.svg'}
							className={styles.image}
							alt={state.currentSound && state.currentSound.title}
						/>
						<div className={styles.titleArtist}>
							<span className={styles.title}>
								{state.currentSound && state.currentSound.title}
								{/* <Heart /> */}
							</span>
							<br />
							<span className={styles.artist}>
								{state.currentSound && state.currentSound.author_name}
							</span>
						</div>
					</div>
					<div className={styles.controls}>
						<div className={styles.buttons}>
							<IconButton onClick={toggleShuffle}>
								{!state.isShuffled && <Shuffle className={styles.icon} />}
								{state.isShuffled && (
									<Shuffle className={styles.icon}
										style={{ color: colors.primary }}
									/>
								)}
							</IconButton>
							<IconButton onClick={playPrevious}>
								<SkipPrevious className={styles.icon} />
							</IconButton>
							<IconButton
								// className={styles.playPause}
								onClick={togglePlay}
							>
								{state.isPlaying && (
									<PauseCircleOutline
										className={styles.icon}
										style={{ fontSize: 42 }}
									/>
								)}
								{!state.isPlaying && (
									<PlayCircleOutline
										className={styles.icon}
										style={{ fontSize: 42 }}
									/>
								)}
							</IconButton>
							<IconButton onClick={playNext}>
								<SkipNext className={styles.icon} />
							</IconButton>
							<IconButton onClick={toggleRepeat}>
								{state.repeat === NONE && <Repeat className={styles.icon} />}
								{state.repeat === ALL && (
									<Repeat
										className={styles.icon}
										style={{ color: colors.primary }}
									/>
								)}
								{state.repeat === ONE && (
									<RepeatOne
										className={styles.icon}
										style={{ color: colors.primary }}
									/>
								)}
							</IconButton>
						</div>
						<div className={styles.sliderTime}>
							<div className={styles.startTime}>{state.elapsed}</div>
							<div className={styles.slider}>
								<Slider
									value={state.position}
									onChange={handleSeekChange}
									aria-labelledby="continuous-slider"
								/>
							</div>
							<div className={styles.endTime}>{state.duration}</div>
						</div>
					</div>
					<div className={styles.playlistVolume}>
						<IconButton onClick={handleQueue}>
							<PlaylistPlayOutlined
								className={styles.icon}
							/>
						</IconButton>
						<div className={styles.volumeIcons}>
							{state.volume === 0 && (
								<VolumeMuteOutlined className={styles.icon} />
							)}
							{state.volume > 0 && state.volume <= 70 && (
								<VolumeDownOutlined className={styles.icon} />
							)}
							{state.volume > 0 && state.volume > 70 && (
								<VolumeUpOutlined className={styles.icon} />
							)}
						</div>
						<div className={styles.volumeSliderContainer}>
							<Slider
								value={state.volume}
								onChange={handleVolumeChange}
								aria-labelledby="continuous-slider"
							/>
						</div>
					</div>
				</div>
				{/* Bottom Drawer */}
				<IconButton
					aria-label="Open left menu"
					onClick={() => setDrawerOpen(true)}
					color="inherit"
					className={styles.bottomMenuIcon}>
					<MoreIcon />
				</IconButton>
				<Drawer anchor='bottom' open={drawerOPen} onClose={() => setDrawerOpen(false)}>
					<div className={styles.bottomDrawer}>
						bottom content
				</div>
				</Drawer>
			</div>
		</Slide>
	)
}
