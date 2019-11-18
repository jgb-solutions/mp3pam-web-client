import axios from "axios";
import React, { useState, useEffect } from "react";
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { get } from "lodash-es";
import useForm from 'react-hook-form';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import CreateIcon from '@material-ui/icons/Create';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import ProgressBar from "../../components/ProgressBar";
import TextField from "../../components/TextField";
import Button from '../../components/Button';
import UploadButton from '../../components/UploadButton';
import CheckAuth from "../../components/CheckAuth";
import HeaderTitle from "../../components/HeaderTitle";
import { makeStyles, withStyles } from "@material-ui/styles";
import { NativeSelect } from "@material-ui/core";
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
	const [completed, setCompleted] = useState(0);
	const { register, getValues, handleSubmit, errors } = useForm<trackData>({ mode: 'onBlur' });
	const { loading, error, data, fetchMore } = useQuery(FETCH_TRACK_UPLOAD_DATA)
	const [imgUpload, imgFileUrl, imgloading, imgError, imgUploaded, imgPercentUploaded] = useFileUpload('img');

	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		imgUpload(get(event.target, 'files[0]'));
	};

	// const handleAudioUpload = (
	// 	event: React.ChangeEvent<HTMLInputElement>
	// ) => {
	// 	handleFileUpload(event, 'sound');
	// };

	type trackData = {
		title?: string;
		image?: string;
		audio: string;
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
			<HeaderTitle icon={<MusicNoteIcon />} text={`Add a new track ${completed}%`} />
			{JSON.stringify(getValues())}
			{!imgloading && imgUploaded && (
				<p>
					The file link is{" "}
					<a target="_blank" rel="noopener noreferrer" href={imgFileUrl}>
						{imgFileUrl}
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

				<UploadButton buttonSize='large' style={styles.uploadButton} accept="image/*" onChange={handleImageUpload}>
					Choose Poster
					</UploadButton>

				{imgPercentUploaded > 0 && imgPercentUploaded < 100 && (
					<ProgressBar
						variant="determinate"
						color="secondary"
						value={imgPercentUploaded}
					/>
				)}

				{/* <UploadButton buttonSize='large' style={styles.uploadButton} accept=".mp3, audio/mp3" onChange={handleAudioUpload}>
					Choose Track
							</UploadButton>

				{completed > 0 && (
					<ProgressBar
						variant="determinate"
						color="secondary"
						value={completed}
					/>
				)} */}

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
