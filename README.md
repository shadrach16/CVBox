
# README.md

# CvBox

CvBox is an AI-driven platform designed to help job seekers optimize their CVs and enhance their online presence. By analyzing a user's CV against a specific job description, the platform identifies areas for improvement and provides tailored recommendations.

## Setup

1.  **Install Node.js:** Ensure you have Node.js installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).

2.  **Clone the repository:**

    bash
    git clone <repository_url>
    cd CvBox
    

3.  **Install dependencies:**

    bash
    npm install
    

## Running the Application

1.  **Set up your Gemini API key:**
    *   Obtain an API key from Google Gemini AI.
    *   Store the API key as an environment variable or directly in `src/config.js`.  For security, using environment variables is highly recommended.

2.  **Start the server:**

    bash
    npm start
    

    This command starts the backend server. By default, the server runs on port 3000.

3.  **Open the application:**
    *   Open your web browser and navigate to `http://localhost:3000` (or the specified port).

You should now be able to upload your CV and a job description, analyze them, and receive personalized feedback.
