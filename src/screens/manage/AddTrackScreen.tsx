import React, { useState, useEffect } from "react"
import { useQuery } from '@apollo/react-hooks'
import { get } from "lodash-es"
import useForm from 'react-hook-form'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import DialogContentText from '@material-ui/core/DialogContentText'
import { useHistory, useLocation } from "react-router-dom"
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import { Grid, FormControlLabel, Checkbox } from "@material-ui/core"
import { useMutation } from '@apollo/react-hooks'

import ProgressBar from "../../components/ProgressBar"
import TextField from "../../components/TextField"
import Button from '../../components/Button'
import UploadButton from '../../components/UploadButton'
import CheckAuth from "../../components/CheckAuth"
import HeaderTitle from "../../components/HeaderTitle"
import { TRACK_UPLOAD_DATA_QUERY } from "../../graphql/queries"
import useFileUpload from "../../hooks/useFileUpload"
import TextIcon from "../../components/TextIcon"
import { addTrackScreenStyles } from "../../styles/addTrackScreenStyles"
import useAddTrack from '../../hooks/useAddTrack'
import Routes from "../../routes"
import AlertDialog from "../../components/AlertDialog"
import { ADD_GENRE_MUTATION } from "../../graphql/mutations"
import { IMG_BUCKET, AUDIO_BUCKET, MAX_AUDIO_FILE_SIZE, MAX_IMG_FILE_SIZE, MIN_TRACK_LYRICS_LENGTH, MIN_TRACK_DETAIL_LENGTH } from "../../utils/constants"
import { getFile } from "../../utils/helpers"
import useAddArtist from "../../hooks/useAddArtist"
import SEO from "../../components/SEO"

export interface FormData {
	title: string
	genreId: string
	detail: string
	lyrics: string
	artistId: string
	allowDownload: boolean
};

export interface ArtistData {
	id: string
	stage_name: string
};

export interface GenreData {
	id: string
	name: string
};

export interface TrackData extends FormData {
	poster: string
	audioName: string
	audioFileSize: number,
	img_bucket: string
	audio_bucket: string
}

type AddArtistFormProps = {
	open: boolean,
	handleClose: () => void,
	onArtistCreated: (values: ArtistData) => void
}

type AddArtistFormData = {
	name: string,
	stage_name: string,
	img_bucket: string
}

export function AddArtistForm({ open, handleClose, onArtistCreated }: AddArtistFormProps) {
	const {
		register,
		handleSubmit,
		errors,
		formState
	} = useForm<AddArtistFormData>({ mode: 'onBlur' })
	const { addArtist, data: artistData } = useAddArtist()
	const styles = addTrackScreenStyles()

	const handleAddArtist = (artist: AddArtistFormData) => {
		addArtist({ ...artist, img_bucket: IMG_BUCKET })
	}

	useEffect(() => {
		if (artistData) {
			handleClose()
			onArtistCreated(artistData.addArtist)
		}
		// eslint-disable-next-line
	}, [artistData])

	return <AlertDialog
		open={open}
		handleClose={handleClose}
		maxWidth='xs'>
		<HeaderTitle
			style={{ margin: 0 }}
			textStyle={{ fontSize: 16 }}
			icon={<PersonPinCircleIcon />}
			text={`Add a New Artist`}
		/>

		<form onSubmit={handleSubmit(handleAddArtist)} noValidate>
			<TextField
				style={{ marginTop: 0 }}
				inputRef={register({
					required: "The name is required.",
				})}
				autoFocus
				name="name"
				id="name"
				label="Name *"
				type="text"
				margin="normal"
				error={!!errors.name}
				helperText={errors.name && (
					<TextIcon
						icon={<ErrorIcon className={styles.errorColor} />}
						text={<span className={styles.errorColor}>{errors.name.message}</span>}
					/>
				)}
			/>

			<TextField
				inputRef={register({
					required: "The stage name is required.",
				})}
				name="stage_name"
				id="stage_name"
				label="Stage Name *"
				type="text"
				margin="normal"
				error={!!errors.stage_name}
				helperText={errors.stage_name && (
					<TextIcon
						icon={<ErrorIcon className={styles.errorColor} />}
						text={<span className={styles.errorColor}>{errors.stage_name.message}</span>}
					/>
				)}
			/>

			<Button
				type="submit"
				size='large'
				style={{ marginTop: 15, marginBottom: 15 }}
				disabled={formState.isSubmitting}>Add Artist</Button>
		</form>
	</AlertDialog>
}

type AddGenreFormProps = { open: boolean, handleClose: () => void, onGenreCreated: (values: GenreData) => void }
type AddGenreFormData = { name: string }
export function AddGenreForm({ open, handleClose, onGenreCreated }: AddGenreFormProps) {
	const { register,
		handleSubmit,
		errors,
		formState
	} = useForm<AddGenreFormData>({ mode: 'onBlur' })
	const [addGenreMutation, { data: genreData }] = useMutation(ADD_GENRE_MUTATION)
	const styles = addTrackScreenStyles()

	const handleAddGenre = (genre: AddGenreFormData) => {
		addGenreMutation({ variables: { input: genre } })
	}

	useEffect(() => {
		if (genreData) {
			handleClose()
			onGenreCreated(genreData.addGenre)
		}
		// eslint-disable-next-line
	}, [genreData])

	return <AlertDialog
		open={open}
		handleClose={handleClose}
		maxWidth='xs'>
		<HeaderTitle style={{ margin: 0 }} textStyle={{ fontSize: 16 }} icon={<PersonPinCircleIcon />} text={`Add a New Genre`} />

		<form onSubmit={handleSubmit(handleAddGenre)} noValidate>
			<TextField
				style={{ marginTop: 0 }}
				inputRef={register({
					required: "The name is required.",
				})}
				autoFocus
				name="name"
				id="name"
				label="Name *"
				type="text"
				margin="normal"
				error={!!errors.name}
				helperText={errors.name && (
					<TextIcon
						icon={<ErrorIcon className={styles.errorColor} />}
						text={<span className={styles.errorColor}>{errors.name.message}</span>}
					/>
				)}
			/>

			<Button
				type="submit"
				size='large'
				style={{ marginTop: 15, marginBottom: 15 }}
				disabled={formState.isSubmitting}>Add Genre</Button>
		</form>
	</AlertDialog>
}

export default function AddTrackScreen() {
	const history = useHistory()
	const location = useLocation()

	const album_id = get(location, 'state.album_id')
	const track_number = get(location, 'state.track_number')

	const { register,
		handleSubmit,
		errors,
		formState,
		watch,
		setError,
		clearError,
		setValue
	} = useForm<FormData>({ mode: 'onBlur' })
	register({ name: 'allowDownload', })
	const { data: trackUploadInfo } = useQuery(TRACK_UPLOAD_DATA_QUERY, {
		fetchPolicy: 'network-only'
	})
	const { addTrack, loading: formWorking, data: uploadedTrack } = useAddTrack()
	const {
		upload: uploadImg,
		uploading: imgUploading,
		isUploaded: imgUploaded,
		percentUploaded: imgPercentUploaded,
		isValid: imgValid,
		errorMessage: imgErrorMessage,
		filename: poster
	} = useFileUpload({
		bucket: IMG_BUCKET,
		message: "You must choose a poster.",
		headers: { public: true }
	})

	const {
		upload: uploadAudio,
		size: audioSize,
		uploading: audioUploading,
		isUploaded: audioUploaded,
		percentUploaded: audioPercentUploaded,
		isValid: audioValid,
		errorMessage: audioErrorMessage,
		filename: audioName
	} = useFileUpload({ bucket: AUDIO_BUCKET, message: "You must choose a track." })
	const [openTrackSuccessDialog, setOpenTrackSuccessDialog] = useState(false)
	const [openAddArtistDialog, setOpenAddArtistDialog] = useState(false)
	const [openAddGenreDialog, setOpenAddGenreDialog] = useState(false)
	const [openInvalidFileSize, setOpenInvalidFileSize] = useState('')
	const [artistList, setArtistList] = useState<ArtistData[]>([])
	const [genreList, setGenreList] = useState<GenreData[]>([])
	const [chosenArtistId, setChosenArtistId] = useState("")
	const [chosenGenreId, setChosenGenreId] = useState("")
	const watchArtistValue = watch('artistId')
	const watchGenreValue = watch('genreId')

	const goToTracksLibrary = () => {
		history.push(Routes.user.manage.tracks)
	}

	const handleTrackSucessDialogClose = () => setOpenTrackSuccessDialog(false)

	const handleAddArtistDialogClose = () => {
		if (!watchArtistValue || watchArtistValue === "add-artist") {
			setValue('artistId', "")
			setError('artistId', 'required', "You must choose an artist.")
		}

		setOpenAddArtistDialog(false)
	}

	const handleAddGenreDialogClose = () => {
		if (!watchGenreValue || watchGenreValue === "add-genre") {
			setValue('genreId', "")
			setError('genreId', 'required', "You must choose an genre.")
		}

		setOpenAddGenreDialog(false)
	}

	const handleOpenInvalidFileSizeClose = () => setOpenInvalidFileSize('')

	const handleOnArtistCreated = ({ id, stage_name }: ArtistData) => {
		const artistExist = artistList.find(artist => artist.id === id)

		if (!artistExist) {
			setArtistList(artistList => [{ id, stage_name }, ...artistList])
		}

		setChosenArtistId(id)
	}

	const handleOnGenreCreated = ({ id, name }: GenreData) => {
		const genreExist = genreList.find(genre => genre.id === id)

		if (!genreExist) {
			setGenreList(genreList => [{ id, name }, ...genreList])
		}

		setChosenGenreId(id)
	}

	useEffect(() => {
		const artists = get(trackUploadInfo, 'me.artists_by_stage_name_asc.data')
		if (artists) {
			setArtistList(
				artists.map(({ id, stage_name }: ArtistData) => ({ id, stage_name }))
			)
		}
		// eslint-disable-next-line
	}, [get(trackUploadInfo, 'me.artists_by_stage_name_asc.data')])

	useEffect(() => {
		const genres = get(trackUploadInfo, 'genres')
		if (genres) {
			setGenreList(
				genres.map(({ id, name }: GenreData) => ({ id, name }))
			)
		}
		// eslint-disable-next-line
	}, [get(trackUploadInfo, 'genres')])

	useEffect(() => {
		if (chosenArtistId) {
			setValue('artistId', chosenArtistId)
			clearError('artistId')
		}
		// eslint-disable-next-line
	}, [chosenArtistId])

	useEffect(() => {
		if (chosenGenreId) {
			setValue('genreId', chosenGenreId)
			clearError('genreId')
		}
		// eslint-disable-next-line
	}, [chosenGenreId])

	useEffect(() => {
		if (watchArtistValue === "add-artist") {
			setOpenAddArtistDialog(true)
		}
	}, [watchArtistValue])

	useEffect(() => {
		if (watchGenreValue === "add-genre") {
			setOpenAddGenreDialog(true)
		}
	}, [watchGenreValue])

	const handleAllowDownload = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue('allowDownload', event.target.checked)
	}

	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => { uploadImg(getFile(event)) }

	const handleAudioUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => { uploadAudio(getFile(event)) }

	const handleInvalidAudioSize = (filesize: number) => {
		setOpenInvalidFileSize(`
		The file size exceeds 128 MB. <br />
		Choose another one or reduce the size to upload.
	`)
	}

	const handleInvalidAudioType = (filetype: string) => {
		setOpenInvalidFileSize(`
		You must choose an MP3 file.
	`)
	}

	const handleInvalidImageSize = (filesize: number) => {
		setOpenInvalidFileSize(`
		The file size exceeds 5 MB. <br />
		Choose another one or reduce the size to upload.
	`)
	}

	const handleAddTrack = (values: FormData) => {
		if (!poster && !audioName) return

		const track = {
			...values,
			poster: poster || '',
			audioName: audioName || '',
			audioFileSize: audioSize,
			img_bucket: IMG_BUCKET,
			audio_bucket: AUDIO_BUCKET,
			album_id: album_id || null,
			number: track_number || null
		}


		// console.table(track)
		addTrack(track)
	}

	useEffect(() => {
		if (uploadedTrack) {
			setOpenTrackSuccessDialog(true)
		}
	}, [uploadedTrack])

	const styles = addTrackScreenStyles()

	return (
		<CheckAuth className='react-transition scale-in'>
			<HeaderTitle icon={<MusicNoteIcon />} text={`Add a new track`} />
			<SEO title={`Add a new track`} />

			<form onSubmit={handleSubmit(handleAddTrack)} noValidate>
				<TextField
					inputRef={register({
						required: "The title of the track is required.",
					})}
					name="title"
					id="title"
					label="Title *"
					type="text"
					margin="normal"
					error={!!errors.title}
					helperText={errors.title && (
						<TextIcon
							icon={<ErrorIcon className={styles.errorColor} />}
							text={<span className={styles.errorColor}>{errors.title.message}</span>}
						/>
					)}
					style={{ marginBottom: 15 }}
				/>
				<Grid container direction='row' spacing={2}>
					<Grid item xs={12} sm>
						<TextField
							id="artist"
							select
							name='artistId'
							inputRef={register({
								required: "You must choose an artist."
							})}
							SelectProps={{ native: true }}
							error={!!errors.artistId}
							helperText={errors.artistId && (
								<TextIcon
									icon={<ErrorIcon className={styles.errorColor} />}
									text={<span className={styles.errorColor}>{errors.artistId.message}</span>}
								/>
							)}
							margin="normal"
							value={watchArtistValue}
						>
							<optgroup>
								<option value="">Choose an Artist *</option>
							</optgroup>
							{artistList.length && (
								<optgroup label="------">
									{artistList.map(({ id, stage_name }: ArtistData) => (
										<option key={id} value={id}>{stage_name}</option>
									))}
								</optgroup>
							)}
							<optgroup label="------">
								<option value="add-artist">+ Add an Artist</option>
							</optgroup>
						</TextField>
					</Grid>
					<Grid item xs={12} sm>
						<TextField
							id="genre"
							select
							name='genreId'
							inputRef={register({ required: "You must choose an genre." })}
							SelectProps={{ native: true }}
							error={!!errors.genreId}
							helperText={errors.genreId && (
								<TextIcon
									icon={<ErrorIcon className={styles.errorColor} />}
									text={<span className={styles.errorColor}>{errors.genreId.message}</span>}
								/>
							)}
							margin="normal"
							value={watchGenreValue}
						>
							<optgroup>
								<option value="">Choose an Genre *</option>
							</optgroup>
							{genreList.length && (
								<optgroup label="------">
									{genreList.map(({ id, name }: GenreData) => (
										<option key={id} value={id}>{name}</option>
									))}
								</optgroup>
							)}
							<optgroup label="------">
								<option value="add-genre">+ Add a Genre</option>
							</optgroup>
						</TextField>
					</Grid>
				</Grid>

				<Grid container direction='row' spacing={2}>
					<Grid item xs={12} sm>
						<Grid container direction='row' alignItems='center' spacing={1} className={styles.uploadButton}>
							<Grid item xs={9}>
								<UploadButton
									allowedFileSize={MAX_AUDIO_FILE_SIZE()}
									onFileSizeInvalid={handleInvalidAudioSize}
									buttonSize='large'
									accept=".mp3, audio/mp3"
									allowedFileType="mp3"
									onFileTypeInvalid={handleInvalidAudioType}
									onChange={handleAudioUpload}
									title="Choose the Track *"
									disabled={audioUploaded}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								{audioUploaded && (
									<CheckCircleIcon className={styles.successColor} />
								)}
							</Grid>
						</Grid>


						{formState.isSubmitted && !audioValid && (
							<TextIcon
								icon={<ErrorIcon className={styles.errorColor} />}
								text={<span className={styles.errorColor}>{audioErrorMessage}</span>}
							/>
						)}

						{audioUploading && (
							<ProgressBar
								variant="determinate"
								color="secondary"
								value={audioPercentUploaded}
							/>
						)}
					</Grid>
					<Grid item xs={12} sm>
						<Grid container direction='row' alignItems='center' spacing={1} className={styles.uploadButton}>
							<Grid item xs={9}>
								<UploadButton
									allowedFileSize={MAX_IMG_FILE_SIZE()}
									onFileSizeInvalid={handleInvalidImageSize}
									buttonSize='large'
									accept="image/*"
									onChange={handleImageUpload}
									title="Choose a Poster *"
									disabled={imgUploaded}
									fullWidth
								/>
							</Grid>
							<Grid item xs={3}>
								{imgUploaded && <CheckCircleIcon className={styles.successColor} />}
							</Grid>
						</Grid>

						{formState.isSubmitted && !imgValid && (
							<TextIcon
								icon={<ErrorIcon className={styles.errorColor} />}
								text={<span className={styles.errorColor}>{imgErrorMessage}</span>}
							/>
						)}

						{imgPercentUploaded > 0 && imgPercentUploaded < 100 && (
							<ProgressBar
								variant="determinate"
								color="secondary"
								value={imgPercentUploaded}
							/>
						)}
					</Grid>
				</Grid>

				<TextField
					inputRef={register({
						minLength: {
							value: MIN_TRACK_DETAIL_LENGTH,
							message: `The detail must be at least ${MIN_TRACK_DETAIL_LENGTH} characters.`
						}
					})}
					name="detail"
					id="detail"
					label="Detail"
					multiline
					rowsMax="4"
					margin="normal"
					error={!!errors.detail}
					helperText={errors.detail && (
						<TextIcon
							icon={<ErrorIcon className={styles.errorColor} />}
							text={<span className={styles.errorColor}>{errors.detail.message}</span>}
						/>
					)}
				/>

				<TextField
					inputRef={register({
						minLength: {
							value: MIN_TRACK_LYRICS_LENGTH,
							message: `The lyrics must be at least ${MIN_TRACK_LYRICS_LENGTH} characters.`
						}
					})}
					name="lyrics"
					id="lyrics"
					label="Lyrics"
					multiline
					rowsMax="50"
					margin="normal"
					error={!!errors.lyrics}
					helperText={errors.lyrics && (
						<TextIcon
							icon={<ErrorIcon className={styles.errorColor} />}
							text={<span className={styles.errorColor}>{errors.lyrics.message}</span>}
						/>
					)}
				/>

				<div style={{ marginTop: 15, marginBottom: 15 }}>
					<FormControlLabel
						control={
							<Checkbox
								onChange={handleAllowDownload}
							/>
						}
						label="Allow Download"
					/>
				</div>

				<Button
					type="submit"
					size='large'
					style={{ marginTop: 15 }}
					disabled={imgUploading || audioUploading || formWorking}>Add Track</Button>
			</form>

			{/* Success Dialog */}
			<AlertDialog
				open={openTrackSuccessDialog}
				handleClose={handleTrackSucessDialogClose}
				disableBackdropClick>
				<DialogContentText id="alert-dialog-description" align='center'>
					<span><CheckCircleIcon style={{ fontSize: 64 }} className={styles.successColor} /></span>
					<br />
					<span>Track successfully added!</span>
					<br />
					<br />
					{album_id ? (
						<Button size='small' onClick={() => history.goBack()} color="primary">
							Go Back To Album
						</Button>
					) : (
							<Button size='small' onClick={goToTracksLibrary} color="primary">
								Go To Your Tracks
          </Button>
						)}
				</DialogContentText>
			</AlertDialog>

			{/* Add Artist Dialog */}
			<AddArtistForm
				open={openAddArtistDialog}
				handleClose={handleAddArtistDialogClose}
				onArtistCreated={handleOnArtistCreated}
			/>
			{/* Add Genre Dialog */}
			<AddGenreForm
				open={openAddGenreDialog}
				handleClose={handleAddGenreDialogClose}
				onGenreCreated={handleOnGenreCreated}
			/>

			{/* Handling invalid file sizes */}
			{/* Invalid File Size Dialog */}
			<AlertDialog
				open={!!openInvalidFileSize}
				handleClose={handleOpenInvalidFileSizeClose}>
				<DialogContentText id="alert-dialog-description" align='center'>
					<span>
						<ErrorIcon style={{ fontSize: 64 }} className={styles.errorColor} />
					</span>
					<br />
					<span dangerouslySetInnerHTML={{ __html: openInvalidFileSize }} />
					<br />
					<br />
					<Button size='small' onClick={handleOpenInvalidFileSizeClose} color="primary">
						OK
          </Button>
				</DialogContentText>
			</AlertDialog>
		</CheckAuth>
	)
}
