import axios from "axios";
import React, { useState, useEffect } from "react";
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { get } from "lodash-es";
import useForm from 'react-hook-form';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { StepIconProps } from '@material-ui/core/StepIcon';
import clsx from 'clsx';
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
import { Stepper, Step, StepLabel, StepContent, Typography, Paper, NativeSelect } from "@material-ui/core";
import colors from "../../utils/colors";

export const UPLOAD_URL = gql`
  query getUploadUrl($name: String!, $type: String!) {
    uploadUrl(name: $name, type: $type) {
     signedUrl
		 fileUrl
    }
  }
`;

export const FETCH_TRACK_UPLOAD_DATA = gql`
  query fetchTrackUploadData {
    categories {
			data {
				id
				name
			}
  	}
  }
`;

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
});

const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: '#ccc',
		// zIndex: 1,
		color: '#fff',
		width: 40,
		height: 40,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	active: {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	},
	completed: {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	},
});

const StyledStepLabel = withStyles({
	label: {
		color: colors.white,
		fontSize: 15,
	},
	completed: {
		color: `${colors.white} !important`
	},
	active: {
		color: `${colors.white} !important`
	}
})(StepLabel);

const StyledFormHelperText = withStyles({
	root: {
		color: colors.white
	}
})(FormHelperText);

function StyledStepIcon(props: StepIconProps) {
	const styles = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons: { [index: string]: React.ReactElement } = {
		1: <CreateIcon />,
		2: <PhotoCameraIcon />,
		3: <MusicNoteIcon />,
	};

	return (
		<div
			className={clsx(styles.root, {
				[styles.active]: active,
				[styles.completed]: completed,
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
}

function getSteps() {
	return [
		"Basic Info",
		'Poster',
		'Track'
	];
}

export default function AddTrackScreen() {
	const client = useApolloClient();
	const [completed, setCompleted] = useState(0);
	const [isUploaded, setIsUploaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [fileUrl, setFileUrl] = useState("");
	const [uploadError, setUploadError] = useState("")
	const { register, getValues, handleSubmit, errors } = useForm<trackData>({ mode: 'onBlur' });
	const { loading, error, data, fetchMore } = useQuery(FETCH_TRACK_UPLOAD_DATA)

	useEffect(() => {
		if (completed === 100) setCompleted(0);
	}, [completed]);

	const handleProgressEvent = (progressEvent: ProgressEvent) => {
		console.log(progressEvent);
		const percentCompleted = Math.round(
			(progressEvent.loaded * 100) / progressEvent.total
		);
		console.log(percentCompleted);
		setCompleted(percentCompleted);
	};

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
		setIsLoading(true);
		console.log(event);
		const file = get(event.target, 'files[0]');
		if (!file) return;

		console.log("file", file);

		try {
			const { data: { uploadUrl: { signedUrl, fileUrl } } } = await client.query({
				query: UPLOAD_URL,
				variables: { name: file.name, type },
				fetchPolicy: 'network-only'
			});

			setFileUrl(fileUrl);

			const options = {
				headers: {
					"Content-Type": file.type,
					"x-amz-acl": 'public-read'
					// 'Content-Disposition': 'attachment'
				},
				onUploadProgress: handleProgressEvent
			};

			try {
				const response = await axios.put(signedUrl, file, options);
				// Success
				setIsUploaded(true);
				setIsLoading(false);
				// response from DO Spaces servers
				console.log(response);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleFileUpload(event, 'img');
	};

	const handleAudioUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleFileUpload(event, 'sound');
	};

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

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return (
					<>
						<TextField
							inputRef={register({
								required: "The title of the track is required.",
							})}
							name="title"
							id="title"
							label="What is the Track Title?"
							type="title"
							margin="normal"
							error={!!errors.title}
							helperText={errors.title && errors.title.message}
							style={{ marginBottom: 20 }}
						/>
						{/* Select Genre */}
						<FormControl className={styles.formControl} error={!!errors.genre}>
							<NativeSelect
								name='genre'
								ref={register({
									required: "You must choose a genre."
								})}
								className={styles.selectGenre}
								classes={{ icon: styles.selectGenreIcon }}>
								<option value="">Choose a Genre</option>
								{get(data, 'categories.data') && data.categories.data.map(({ id, name }: { id: string, name: string }) => (
									<option key={id} value={id}>{name}</option>
								))}
							</NativeSelect>
							<StyledFormHelperText>{errors.genre && errors.genre.message}</StyledFormHelperText>
						</FormControl>
					</>
				);
			case 1:
				return (
					<div>
						<UploadButton accept="image/*" onChange={handleImageUpload}>
							Choose Poster
						</UploadButton>

						{completed > 0 && (
							<ProgressBar
								variant="determinate"
								color="secondary"
								value={completed}
							/>
						)}
					</div>
				);
			case 2:
				return (
					<div>
						<UploadButton accept=".mp3, audio/mp3" onChange={handleAudioUpload}>
							Choose Track
						</UploadButton>

						{completed > 0 && (
							<ProgressBar
								variant="determinate"
								color="secondary"
								value={completed}
							/>
						)}
					</div>
				);
			default:
				return 'Unknown step';
		}
	}

	const styles = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<CheckAuth className='react-transition scale-in'>
			<HeaderTitle icon={<MusicNoteIcon />} text={`Add a new track ${completed}%`} />
			{JSON.stringify(getValues())}
			{!isLoading && isUploaded && (
				<p>
					The file link is{" "}
					<a target="_blank" rel="noopener noreferrer" href={fileUrl}>
						{fileUrl}
					</a>
				</p>
			)}
			<form onSubmit={handleSubmit(addTrack)} noValidate>
				{uploadError && <h3 dangerouslySetInnerHTML={{ __html: uploadError }} />}
				<Stepper className={styles.root} activeStep={activeStep} orientation="vertical">
					{steps.map((label, index) => (
						<Step key={label}>
							<StyledStepLabel StepIconComponent={StyledStepIcon}>{label}</StyledStepLabel>
							<StepContent>
								{getStepContent(index)}
							</StepContent>
						</Step>
					))}
				</Stepper>
				{activeStep === steps.length && (
					<Paper square elevation={0} className={styles.resetContainer}>
						<Typography>All steps completed - you&apos;re finished</Typography>
						<Button onClick={handleReset} className={styles.button}>
							Reset
          </Button>
					</Paper>
				)}
			</form>
			<div className={styles.actionsContainer}>
				<div>
					<Button
						disabled={activeStep === 0}
						onClick={handleBack}
						className={styles.button}
					>
						Back
                  </Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleNext}
						className={styles.button}
					>
						{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
					</Button>
				</div>
			</div>
		</CheckAuth>
	);
}
