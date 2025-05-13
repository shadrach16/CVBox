
// ./src/gemini_api.js
const axios = require('axios');
const config = require('./config');

async function analyzeText(cvText, jobDescriptionText) {
	try {
		const geminiApiKey = config.geminiApiKey;
		if (!geminiApiKey) {
			throw new Error('Gemini API key is missing. Please set it in config.js');
		}

		const payload = {
			prompt: `Analyze the CV and job description to identify discrepancies and areas where the CV can be improved to match the job description.
				Identify keywords and skills present in the job description but missing or not highlighted in the CV.
				Assess the relevance of the CV content to the job description.
				Identify potential areas for rephrasing or restructuring the CV.
				CV: ${cvText}
				Job Description: ${jobDescriptionText}`,
		};

		const response = await axios.post('https://generative-ai-api.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiApiKey, {
			contents: [{
				parts: [{text: payload.prompt}]
			}]
		});

		if (response.status !== 200) {
			throw new Error(`Gemini API returned an error: ${response.status} ${response.statusText}`);
		}
		//Adapt to the actual response structure from Gemini
		const analysis = response.data.candidates[0].content.parts[0].text;
		return { analysis };

	} catch (error) {
		console.error('Error calling Gemini API:', error);
		throw new Error(`Failed to analyze text with Gemini API: ${error.message}`);
	}
}

module.exports = { analyzeText };
