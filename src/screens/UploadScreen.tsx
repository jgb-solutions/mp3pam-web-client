import axios from "axios";
import React, { useState, useEffect } from "react";
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import { get } from "lodash-es";

import ProgressBar from "../components/ProgressBar";

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
		console.log("file", file);

		try {
			const { data: { uploadUrl: { signedUrl, fileUrl } } } = await client.query({
				query: UPLOAD_URL,
				variables: { name: file.name, type }
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

	return (
		<>
			<h1>Upload Page {completed}%</h1>
			<input
				type="file"
				accept="image/*"
				placeholder="Choose an image"
				onChange={handleImageUpload}
			/>

			<input
				type="file"
				accept=".mp3, audio/mp3"
				placeholder="Choose an audio"
				onChange={handleAudioUpload}
			/>


			{completed > 0 && (
				<ProgressBar
					variant="determinate"
					color="secondary"
					value={completed}
				/>
			)}
			{!isLoading && isUploaded && (
				<p>
					The file link is{" "}
					<a target="_blank" rel="noopener noreferrer" href={fileUrl}>
						{fileUrl}
					</a>
				</p>
			)}
		</>
	);
}
