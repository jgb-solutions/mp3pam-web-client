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
import Box from '@material-ui/core/Box';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { FETCH_TRACK_UPLOAD_DATA } from "../../graphql/queries";
import useFileUpload from "../../hooks/useFileUpload";
import TextIcon from "../../components/TextIcon";
import { addTrackScreenStyles } from "../../styles/addTrackScreenStyles";
import useAddTrack from '../../hooks/useAddTrack';

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
	const { addTrack, loading, error, data: uploadedTrack } = useAddTrack();

	useEffect(() => {
		if (uploadedTrack) {
			console.log(uploadedTrack);
			window.alert(
				JSON.stringify(uploadedTrack, undefined, 2)
			);
		}
	}, [uploadedTrack])

	const [
		imgUpload,
		imgFileUrl,
		imgSize,
		imgloading,
		imgError,
		imgUploaded,
		imgPercentUploaded,
		imgValid,
		imgErrorMessage
	] = useFileUpload({
		type: 'img',
		message: "Please choose a poster.",
	});

	const [
		audioUpload,
		audioFileUrl,
		audioSize,
		audioloading,
		audioError,
		audioUploaded,
		audioPercentUploaded,
		audioValid,
		audioErrorMessage
	] = useFileUpload({
		type: 'sound',
		message: "Please choose a track."
	});

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

	const handleAddTrack = async (values: FormData) => {
		if (!imgValid && !audioValid) return;

		const track = {
			...values,
			poster: imgFileUrl || '',
			audioName: audioFileUrl || '',
			artistId: 23,
			audioFileSize: audioSize
		};

		console.table(track);

		addTrack(track);
	};

	const styles = addTrackScreenStyles();

	return (
		<CheckAuth className='react-transition scale-in'>
			<HeaderTitle icon={<MusicNoteIcon />} text={`Add a new track`} />
			{/* {JSON.stringify(getValues())} <br /> */}
			{/* {JSON.stringify(formState)} */}
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

			<form onSubmit={handleSubmit(handleAddTrack)} noValidate>
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
					name='genreId'
					inputRef={register({
						required: "You must choose a genre."
					})}
					SelectProps={{ native: true }}
					error={!!errors.genre}
					helperText={errors.genre && errors.genre.message}
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

				{!imgUploaded && (
					<UploadButton
						buttonSize='large'
						style={styles.uploadButton}
						accept="image/*"
						onChange={handleImageUpload}
						title="Choose Poster"
					/>
				)}

				{imgUploaded && (
					<TextIcon
						icon={<CheckCircleIcon className={styles.successColor} />}
						text="Poster uploaded"
					/>
				)}

				{formState.isSubmitted && !imgValid && <Box color="error.main">{imgErrorMessage}</Box>}

				{imgPercentUploaded > 0 && imgPercentUploaded < 100 && (
					<ProgressBar
						variant="determinate"
						color="secondary"
						value={imgPercentUploaded}
					/>
				)}

				{!audioUploaded && (
					<UploadButton
						buttonSize='large'
						style={styles.uploadButton}
						accept=".mp3, audio/mp3"
						onChange={handleAudioUpload}
						title="Choose Track"
					/>
				)}

				{audioUploaded && (
					<TextIcon
						icon={<CheckCircleIcon className={styles.successColor} />}
						text="Track uploaded"
					/>
				)}

				{formState.isSubmitted && !audioValid && <Box color="error.main">{audioErrorMessage}</Box>}

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
					helperText={errors.lyrics && errors.lyrics.message}
				/>

				<Button
					type="submit"
					size='large'
					style={{ marginTop: 15 }}
					disabled={imgloading || audioloading}>Add Track</Button>
			</form>
		</CheckAuth>
	);
}
