
// ./src/components/Results.js
import React from 'react';

function Results({ analysisResults }) {
	if (!analysisResults) {
		return <p>No analysis results to display.</p>;
	}

	const { analysis } = analysisResults;

	return (
		<div>
			<h2>Analysis Results</h2>
			{analysis ? (
				<>
					<p>{analysis}</p>
					{/* TODO: Implement LinkedIn Profile Improvement Recommendations and Gap Identification List as per Design Document 2.1 & 2.2  */}
				</>
			) : (
				<p>Your CV is well-aligned with the job description!</p>
			)}
		</div>
	);
}

export default Results;
