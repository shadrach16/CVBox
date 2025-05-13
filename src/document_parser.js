
// ./src/document_parser.js
const pdfjsLib = require('pdfjs-dist');
const mammoth = require('mammoth');

async function extractText(filename, buffer) {
	const fileType = filename.split('.').pop().toLowerCase();

	try {
		switch (fileType) {
			case 'pdf':
				return await extractTextFromPdf(buffer);
			case 'docx':
				return await extractTextFromDocx(buffer);
			case 'txt':
				return buffer.toString('utf8');
			default:
				throw new Error(`Unsupported file type: ${fileType}`);
		}
	} catch (error) {
		console.error('Error extracting text:', error);
		throw error;
	}
}

async function extractTextFromPdf(buffer) {
	try {
		const pdf = await pdfjsLib.getDocument( {data: buffer} ).promise;
		let text = "";

		for (let i = 1; i <= pdf.numPages; i++) {
			const page = await pdf.getPage(i);
			const content = await page.getTextContent();
			const pageText = content.items.map(item => item.str).join(" ");
			text += pageText + "\n";
		}

		return text;
	} catch (error) {
		console.error("Error extracting text from PDF:", error);
		throw error;
	}
}

async function extractTextFromDocx(buffer) {
	try {
		const result = await mammoth.extractRawText({ buffer: buffer });
		return result.value;
	} catch (error) {
		console.error("Error extracting text from DOCX:", error);
		throw error;
	}
}

module.exports = { extractText };
