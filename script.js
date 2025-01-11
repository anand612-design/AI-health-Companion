const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Replace this with your actual API key and endpoint
const API_KEY = 'sk-d46e91f5672b4819adb12b7297205bd0';
const ENDPOINT = 'https://api.worqhat.com/aicon-v4-large-160824';

// Handle POST requests from the frontend
app.post('/api/recommendations', async (req, res) => {
  const { diet, exercise, sleep, stress } = req.body;

  try {
    // Call the AIcon v4 API
    const response = await axios.post(
      ENDPOINT,
      {
        diet,
        exercise,
        sleep,
        stress
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Send the API response back to the frontend
    res.json({
      recommendations: response.data.recommendations || 'No recommendations available.'
    });
  } catch (error) {
    console.error('Error interacting with the API:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendations from the API.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
