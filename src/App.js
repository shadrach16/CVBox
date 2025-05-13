// ./src/App.js
import React, { useState } from 'react';
import Upload from './components/Upload';
import Results from './components/Results';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
	const [analysisResults, setAnalysisResults] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [view, setView] = useState('upload'); // upload, loading, results, error

	const handleAnalysis = async (cvFile, jobDescriptionFile) => {
		setIsLoading(true);
		setErrorMessage('');
		setView('loading');

		const formData = new FormData();
		formData.append('cv', cvFile);
		formData.append('jobDescription', jobDescriptionFile);

		try {
			const response = await axios.post('http://localhost:3000/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			setAnalysisResults(response.data);
			setView('results');
		} catch (error) {
			console.error('Error uploading files:', error);
			setErrorMessage('An error occurred during the analysis. Please try again.');
			setView('error');
		} finally {
			setIsLoading(false);
		}
	};

	let content;
	switch (view) {
		case 'upload':
			content = <Upload onAnalyze={handleAnalysis} />;
			break;
		case 'loading':
			content = <p>Analyzing documents...</p>;
			break;
		case 'results':
			content = <Results analysisResults={analysisResults} />;
			break;
		case 'error':
			content = <p style={{ color: 'red' }}>{errorMessage}</p>;
			break;
		default:
			content = <Upload onAnalyze={handleAnalysis} />;
	}

	return (
		<div className="app-container">
			<header className="app-header">
				<h1>CvBox</h1>
				<p>Optimize Your CV with AI</p>
			</header>
			<main className="app-main">
				{content}
			</main>
			<footer className="app-footer">
				<p>&copy; 2024 CvBox. All rights reserved.</p>
			</footer>
		</div>
	);
}

export default App;
