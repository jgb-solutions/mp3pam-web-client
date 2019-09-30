import axios from "axios";
import React, { useState, useEffect } from "react";
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import { get } from "lodash-es";
import { Form, Field } from 'react-final-form';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import ProgressBar from "../components/ProgressBar";
import TextField from "@material-ui/core/TextField";
import Button from '../components/Button';
import UploadButton from '../components/UploadButton';

export const UPLOAD_URL = gql`
  query getUploadUrl($name: String!, $type: String!) {
    uploadUrl(name: $name, type: $type) {
     signedUrl
		 fileUrl
    }
  }
`;

export default function Upload() {
	const client = useApolloClient();
	const [completed, setCompleted] = useState(0);
	const [isUploaded, setIsUploaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [fileUrl, setFileUrl] = useState("");

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
		handleFileUpload(event, 'images');
	};

	const handleAudioUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		handleFileUpload(event, 'audios');
	};

	type Stooge = "larry" | "moe" | "curly";

	type Values = {
		firstName?: string;
		lastName?: string;
		employed: boolean;
		favoriteColor?: string;
		toppings?: string[];
		sauces?: string[];
		stooge: Stooge;
		notes?: string;
	};

	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	const onSubmit = async (values: Values) => {
		await sleep(300);
		window.alert(JSON.stringify(values, undefined, 2));
	};

	return (
		<>
			<h1>< CloudUploadIcon /> Upload Page {completed}%</h1>

			<p>
				<UploadButton accept="image/*" onChange={handleImageUpload}>
					<PhotoCameraIcon style={{ fontSize: 36 }} />
				</UploadButton>

				{completed > 0 && (
					<ProgressBar
						variant="determinate"
						color="secondary"
						value={completed}
					/>
				)}
			</p>

			<p>
				<UploadButton accept=".mp3, audio/mp3" onChange={handleAudioUpload}>
					<PlayCircleFilledIcon style={{ fontSize: 36 }} />
				</UploadButton>

				{completed > 0 && (
					<ProgressBar
						variant="determinate"
						color="secondary"
						value={completed}
					/>
				)}
			</p>


			{!isLoading && isUploaded && (
				<p>
					The file link is{" "}
					<a target="_blank" rel="noopener noreferrer" href={fileUrl}>
						{fileUrl}
					</a>
				</p>
			)}
			<Form
				onSubmit={onSubmit}
				// validate={validate}
				render={({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<h2>Render Function as Children</h2>
						<Field name="phone">
							{({ input, meta }) => (
								<div>
									<label>Phone</label>
									<TextField type="text" {...input} placeholder="Phone" />
									{meta.touched && meta.error && <span>{meta.error}</span>}
								</div>
							)}
						</Field>

						<Button type="submit">Submit</Button>
					</form>
				)}
			/>
		</>
	);
}
