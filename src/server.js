
// ./src/server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const config = require('./config');
const documentParser = require('./document_parser');
const geminiApi = require('./gemini_api');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage(); // Store files in memory for processing
const upload = multer({ storage: storage });

app.post('/upload', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'jobDescription', maxCount: 1 }]), async (req, res) => {
	try {
		if (!req.files || !req.files['cv'] || !req.files['jobDescription']) {
			return res.status(400).json({ error: 'Please upload both CV and job description files.' });
		}

		const cvFile = req.files['cv'][0];
		const jobDescriptionFile = req.files['jobDescription'][0];

		const cvText = await documentParser.extractText(cvFile.originalname, cvFile.buffer);
		const jobDescriptionText = await documentParser.extractText(jobDescriptionFile.originalname, jobDescriptionFile.buffer);

		const analysisResults = await geminiApi.analyzeText(cvText, jobDescriptionText);

		res.json(analysisResults);

	} catch (error) {
		console.error('Error processing files:', error);
		res.status(500).json({ error: 'Failed to process files. Please ensure they are valid PDF, DOCX, or TXT files.' });
	}
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
