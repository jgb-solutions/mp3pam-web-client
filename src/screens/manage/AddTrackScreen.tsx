import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks'
import { get } from "lodash-es";
import useForm from 'react-hook-form';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ProgressBar from "../../components/ProgressBar";
import TextField from "../../components/TextField";
import Button from '../../components/Button';
import UploadButton from '../../components/UploadButton';
import CheckAuth from "../../components/CheckAuth";
import HeaderTitle from "../../components/HeaderTitle";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";

import { FETCH_TRACK_UPLOAD_DATA } from "../../graphql/queries";
import useFileUpload from "../../hooks/useFileUpload";
import TextIcon from "../../components/TextIcon";
import { addTrackScreenStyles } from "../../styles/addTrackScreenStyles";
import useAddTrack from '../../hooks/useAddTrack';
import Routes from "../../routes";

type AlertDialogProps = { open: boolean, handleClickOpen: () => void, handleClose: () => void };

export function AlertDialog({ open, handleClickOpen, handleClose }: AlertDialogProps) {
	const styles = addTrackScreenStyles();
	const history = useHistory();

	const goToTracksLibrary = () => {
		history.push(Routes.user.manage.tracks);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			maxWidth='xs'
			disableBackdropClick
		>
			<DialogContent >
				<DialogContentText id="alert-dialog-description" align='center'>
					<p>
						<CheckCircleIcon style={{ fontSize: 64 }} className={styles.successColor} />
					</p>
					<p>
						Track successfully added!
						</p>
					<Button size='small' onClick={goToTracksLibrary} color="primary">
						Go To Your Tracks
          	</Button>
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
}

export interface FormData {
	title: string;
	genreId: number;
	detail: string;
	lyrics: string;
	artistId: number;
};

export interface TrackData extends FormData {
	poster: string;
	audioName: string;
	audioFileSize: number
}

export default function AddTrackScreen() {
	const [uploadError, setUploadError] = useState("")
	const { register, handleSubmit, errors, formState } = useForm<FormData>({ mode: 'onBlur' });
	const { data: trackUploadInfo } = useQuery(FETCH_TRACK_UPLOAD_DATA);
	const { addTrack, loading: formWorking, error, data: uploadedTrack } = useAddTrack();
	const {
		upload: uploadImg,
		fileUrl: imgFileUrl,
		size: imgSize,
		uploading: imgUploading,
		error: imgError,
		isUploaded: imgUploaded,
		percentUploaded: imgPercentUploaded,
		isValid: imgValid,
		errorMessage: imgErrorMessage,
		filename: poster
	} = useFileUpload({ bucket: 'img', message: "Please choose a poster." });

	const {
		upload: uploadAudio,
		fileUrl: audioFileUrl,
		size: audioSize,
		uploading: audioUploading,
		error: audioError,
		isUploaded: audioUploaded,
		percentUploaded: audioPercentUploaded,
		isValid: audioValid,
		errorMessage: audioErrorMessage,
		filename: audioName
	} = useFileUpload({ bucket: 'sound', message: "Please choose a track." });
	const [openDialog, setOpenDialog] = React.useState(false);

	const handleClickOpen = () => {
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
	};

	useEffect(() => {
		if (uploadedTrack) {
			// window.alert(
			// 	JSON.stringify(uploadedTrack, undefined, 2)
			// );
		}
	}, [uploadedTrack])

	const getFile = (event: React.ChangeEvent<HTMLInputElement>) =>
		get(event, 'target.files[0]')

	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		uploadImg(getFile(event));
	};

	const handleAudioUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		uploadAudio(getFile(event));
	};

	const handleAddTrack = async (values: FormData) => {
		if (!poster && !audioName) return;

		const track = {
			...values,
			poster: poster || '',
			audioName: audioName || '',
			artistId: 23,
			audioFileSize: audioSize
		};


		console.table(track);
		setOpenDialog(true)
		addTrack(track);
	};

	const styles = addTrackScreenStyles();

	return (
		<CheckAuth className='react-transition scale-in'>
			<AlertDialog open={openDialog} handleClose={handleClose} handleClickOpen={handleClickOpen} />
			<HeaderTitle icon={<MusicNoteIcon />} text={`Add a new track`} />
			{/* {!imgUploading && imgUploaded && (
				<p>
					The file link is{" "}
					<a target="_blank" rel="noopener noreferrer" href={imgFileUrl}>
						{imgFileUrl}
					</a>
				</p>
			)}

			{!audioUploading && audioUploaded && (
				<p>
					The file link is{" "}
					<a target="_blank" rel="noopener noreferrer" href={audioFileUrl}>
						{audioFileUrl}
					</a>
				</p>
			)} */}

			<form onSubmit={handleSubmit(handleAddTrack)} noValidate>
				{uploadError && <h3 dangerouslySetInnerHTML={{ __html: uploadError }} />}
				<TextField
					inputRef={register({
						required: "The title of the track is required.",
					})}
					name="title"
					id="title"
					label="Track Title *"
					type="text"
					margin="normal"
					error={!!errors.title}
					helperText={errors.title && (
						<TextIcon
							icon={<ErrorIcon className={styles.errorColor} />}
							text={<span className={styles.errorColor}>{errors.title.message}</span>}
						/>
					)}
					style={{ marginBottom: 20 }}
				/>

				<TextField
					id="genre"
					select
					name='genreId'
					inputRef={register({
						required: "You must choose a genre."
					})}
					SelectProps={{ native: true }}
					error={!!errors.genreId}
					helperText={errors.genreId && (
						<TextIcon
							icon={<ErrorIcon className={styles.errorColor} />}
							text={<span className={styles.errorColor}>{errors.genreId.message}</span>}
						/>
					)}
					margin="normal"
				>
					<option value="">Choose a Genre *</option>
					{
						get(trackUploadInfo, 'genres.data') &&
						trackUploadInfo.genres.data.map(({ id, name }: { id: string, name: string }) => (
							<option key={id} value={id}>{name}</option>
						))
					}
				</TextField>
				{console.log(imgUploaded, imgUploading)}
				<UploadButton
					buttonSize='large'
					style={styles.uploadButton}
					accept="image/*"
					onChange={handleImageUpload}
					title="Choose Poster *"
					disabled={imgUploaded}
				/>

				{imgUploaded && (
					<TextIcon
						icon={<CheckCircleIcon className={styles.successColor} />}
						text="Poster uploaded"
					/>
				)}

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
				{console.log(
					audioFileUrl,
					audioSize,
					audioUploading,
					audioError,
					audioUploaded,
					audioPercentUploaded,
					audioValid,
					audioErrorMessage)}
				<UploadButton
					buttonSize='large'
					style={styles.uploadButton}
					accept=".mp3, audio/mp3"
					onChange={handleAudioUpload}
					title="Choose Track *"
					disabled={audioUploaded}
				/>

				{audioUploaded && (
					<TextIcon
						icon={<CheckCircleIcon className={styles.successColor} />}
						text="Track uploaded"
					/>
				)}

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

				<TextField
					inputRef={register({
						minLength: {
							value: 20,
							message: "The detail must be at least 20 characters."
						}
					})}
					name="detail"
					id="detail"
					label="Track Detail"
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
							value: 300,
							message: "The lyrics must be at least 300 characters."
						}
					})}
					name="lyrics"
					id="lyrics"
					label="Track Lyrics"
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

				<Button
					type="submit"
					size='large'
					style={{ marginTop: 15 }}
					disabled={imgUploading || audioUploading || formWorking}>Add Track</Button>
			</form>
		</CheckAuth>
	);
}
