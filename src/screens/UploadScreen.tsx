// @flow
import axios from "axios";
import React, { useState, useEffect, ChangeEvent } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles, darken } from "@material-ui/core/styles";
import colors from "../utils/colors";

const ProgressBar = withStyles({
	root: {
		height: 10,
		backgroundColor: darken(colors.primary, 0.5)
	},
	bar: {
		borderRadius: 20,
		backgroundColor: colors.primary
	}
})(LinearProgress);

export default function Upload() {
	const [completed, setCompleted] = useState(0);
	const [isUploaded, setIsUploaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [url, setUrl] = useState("");

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

	const handleFileUpload = (event: any) => {
		setIsLoading(true);
		console.log(event);
		const file = event.target.files[0];
		console.log("file", file);

		const url = `/wasabi-url?filename=${file.name}&filetype=${file.type}`;
		axios
			.get(url)
			.then(response => {
				// response from App server
				console.log(response);
				const { signed_url: signedUrl, url } = response.data;
				console.log(signedUrl, url);
				setUrl(url);

				const options = {
					headers: {
						"Content-Type": file.type
						// 'Content-Disposition': 'attachment'
					},
					onUploadProgress: handleProgressEvent
				};

				return axios.put(signedUrl, file, options);
			})
			.then(response => {
				// Success
				setIsUploaded(true);
				setIsLoading(false);
				// response from DO Spaces servers
				console.log(response);
			})
			.catch(error => {
				console.log(error);
				setIsLoading(false);
			});
	};

	return (
		<>
			<h1>Upload Page {completed}%</h1>
			<input
				type="file"
				placeholder="Choose a file"
				onChange={handleFileUpload}
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
					<a target="_blank" rel="noopener noreferrer" href={url}>
						{url}
					</a>
				</p>
			)}
		</>
	);
}
