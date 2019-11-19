import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks'
import { get } from "lodash-es";
import useForm from 'react-hook-form';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ProgressBar from "../../components/ProgressBar";
import TextField from "../../components/TextField";
import Button from '../../components/Button';
import UploadButton from '../../components/UploadButton';
import CheckAuth from "../../components/CheckAuth";
import HeaderTitle from "../../components/HeaderTitle";
import { makeStyles } from "@material-ui/styles";
import colors from "../../utils/colors";
import { FETCH_TRACK_UPLOAD_DATA } from "../../graphql/queries";
import useFileUpload from "../../hooks/useFileUpload";

const useStyles = makeStyles({
	root: {
		backgroundColor: colors.contentGrey,
		color: colors.white,
		padding: 0,
	},
	button: {
		// marginTop: theme.spacing(1),
		// marginRight: theme.spacing(1),
	},
	actionsContainer: {
		// marginTop: 5,
	},
	resetContainer: {
		padding: 3,
	},
	stepLabel: {
		'label + &': {
			color: colors.white,
		}
	},
	formControl: {
		margin: 1,
		minWidth: 120,
	},
	selectGenre: {
		marginTop: 2,
		color: colors.white,
		borderBottom: colors.primary,
		'&:before': {
			borderColor: colors.primary,
		},
		'&:after': {
			borderColor: colors.primary,
		},
	},
	selectGenreIcon: {
		fill: colors.primary,
	},
	uploadButton: {
		marginTop: 24,
	}
});

export default function AddTrackScreen() {
	const [uploadError, setUploadError] = useState("")
	const { register, getValues, handleSubmit, errors, setValue, setError } = useForm<trackData>({ mode: 'onBlur' });
	const { data } = useQuery(FETCH_TRACK_UPLOAD_DATA)
	const [imgUpload, imgFileUrl, imgloading, imgError, imgUploaded, imgPercentUploaded] = useFileUpload('img');
	const [audioUpload, audioFileUrl, audioloading, audioError, audioUploaded, audioPercentUploaded] = useFileUpload('sound');

	React.useEffect(() => {
		register({ name: "poster" });
		register({ name: "audioName" });
	}, [register])

	useEffect(() => {
		if (imgFileUrl) {
			setValue('poster', imgFileUrl)
		} else {
			setError('poster', 'required', 'Please choose a poster');
		}
	}, [imgUploaded])

	const getFile = (event: React.ChangeEvent<HTMLInputElement>) =>
		get(event, 'target.files[0]')

	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		imgUpload(getFile(event));
	};

	const handleAudioUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		audioUpload(getFile(event));
	};

	type trackData = {
		title?: string;
		poster?: string;
		audioName: string;
		genre?: string;
		detail: string;
		lyrics: string;
	};


	const addTrack = async (values: trackData) => {
		window.alert(JSON.stringify(values, undefined, 2));
	};

	const styles = useStyles();

	return (
		<CheckAuth className='react-transition scale-in'>
			<HeaderTitle icon={<MusicNoteIcon />} text={`Add a new track`} />
			{JSON.stringify(getValues())}
			{!imgloading && imgUploaded && (
				<p>
					The file link is{" "}
					<a target="_blank" rel="noopener noreferrer" href={imgFileUrl}>
						{imgFileUrl}
					</a>
				</p>
			)}

			{!audioloading && audioUploaded && (
				<p>
					The file link is{" "}
					<a target="_blank" rel="noopener noreferrer" href={audioFileUrl}>
						{audioFileUrl}
					</a>
				</p>
			)}

			<form onSubmit={handleSubmit(addTrack)} noValidate>
				{uploadError && <h3 dangerouslySetInnerHTML={{ __html: uploadError }} />}
				<TextField
					inputRef={register({
						required: "The title of the track is required.",
					})}
					name="title"
					id="title"
					label="What is the Track Title? *"
					type="text"
					margin="normal"
					error={!!errors.title}
					helperText={errors.title && errors.title.message}
					style={{ marginBottom: 20 }}
				/>

				<TextField
					id="genre"
					select
					name='genre'
					inputRef={register({
						required: "You must choose a genre."
					})}
					SelectProps={{ native: true }}
					error={!!errors.genre}
					helperText={errors.genre && errors.genre.message}
					margin="normal"
				>
					<option value="">Choose a Genre *</option>
					{get(data, 'genres.data') && data.genres.data.map(({ id, name }: { id: string, name: string }) => (
						<option key={id} value={id}>{name}</option>
					))}
				</TextField>

				<UploadButton
					buttonSize='large'
					style={styles.uploadButton}
					accept="image/*"
					onChange={handleImageUpload}
					title="Choose Poster"
				/>

				{imgPercentUploaded > 0 && imgPercentUploaded < 100 && (
					<ProgressBar
						variant="determinate"
						color="secondary"
						value={imgPercentUploaded}
					/>
				)}

				<UploadButton
					buttonSize='large'
					style={styles.uploadButton}
					accept=".mp3, audio/mp3"
					onChange={handleAudioUpload}
					title="Choose Track"
				/>

				{audioPercentUploaded > 0 && audioPercentUploaded < 100 && (
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
					helperText={errors.detail && errors.detail.message}
				/>

				<TextField
					inputRef={register({
						minLength: {
							value: 20,
							message: "The lyrics must be at least 20 characters."
						}
					})}
					name="lyrics"
					id="lyrics"
					label="Track Lyrics"
					multiline
					rowsMax="50"
					margin="normal"
					error={!!errors.lyrics}
					helperText={errors.lyrics && errors.lyrics.message}
				/>

				<Button type="submit" size='large' style={{ marginTop: 15 }}>Add Track</Button>
			</form>
		</CheckAuth>
	);
}
