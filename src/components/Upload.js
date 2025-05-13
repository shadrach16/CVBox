
// ./src/components/Upload.js
import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
	const [cvFile, setCvFile] = useState(null);
	const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
	const [cvFileName, setCvFileName] = useState('');
	const [jobDescriptionFileName, setJobDescriptionFileName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleCvUpload = (event) => {
		const file = event.target.files[0];
		if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'text/plain')) {
			setCvFile(file);
			setCvFileName(file.name);
			setErrorMessage('');
		} else {
			setCvFile(null);
			setCvFileName('');
			setErrorMessage('Invalid CV file type. Please upload a PDF, DOCX, or TXT file.');
		}
	};

	const handleJobDescriptionUpload = (event) => {
		const file = event.target.files[0];
		if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'text/plain')) {
			setJobDescriptionFile(file);
			setJobDescriptionFileName(file.name);
			setErrorMessage('');
		} else {
			setJobDescriptionFile(null);
			setJobDescriptionFileName('');
			setErrorMessage('Invalid Job Description file type. Please upload a PDF, DOCX, or TXT file.');
		}
	};

	const handleAnalyze = async () => {
		if (!cvFile || !jobDescriptionFile) {
			setErrorMessage('Please upload both CV and Job Description files.');
			return;
		}

		setIsLoading(true);
		setErrorMessage('');

		const formData = new FormData();
		formData.append('cv', cvFile);
		formData.append('jobDescription', jobDescriptionFile);

		try {
			const response = await axios.post('http://localhost:3000/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log('Analysis Results:', response.data);
			// TODO: Dispatch an action or call a function to update the parent component (App.js) with the analysis results
			// and transition to the Results component. The response data will be passed to the result component.
		} catch (error) {
			console.error('Error uploading files:', error);
			setErrorMessage('An error occurred during the analysis. Please try again.');
			// TODO: Dispatch an error action
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<h2>Upload Documents</h2>
			{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

			<div>
				<label htmlFor="cv-upload">Upload CV:</label>
				<input type="file" id="cv-upload" onChange={handleCvUpload} />
				{cvFileName && <p>Selected CV: {cvFileName}</p>}
			</div>

			<div>
				<label htmlFor="job-description-upload">Upload Job Description:</label>
				<input type="file" id="job-description-upload" onChange={handleJobDescriptionUpload} />
				{jobDescriptionFileName && <p>Selected Job Description: {jobDescriptionFileName}</p>}
			</div>

			<button onClick={handleAnalyze} disabled={isLoading}>
				{isLoading ? 'Analyzing...' : 'Analyze'}
			</button>
		</div>
	);
}

export default Upload;
