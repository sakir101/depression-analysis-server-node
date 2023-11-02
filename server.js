const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios"); // Import the axios library

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Endpoint to receive text data and predictions

// Endpoint to send text data to Python REST API
app.post("/processText", async (req, res) => {
  try {
    const textData = req.body.clean_text;
    console.log(textData);
    const apiUrl = "http://127.0.0.1:5000/predict"; // Replace with the actual API URL

    // Send a POST request to the Python API
    const response = await axios.post(apiUrl, { clean_text: textData });

    // Extract the prediction result from the response
    const prediction = response.data.prediction;
    console.log(prediction);

    // Return the prediction to the client
    res.json({ prediction });
  } catch (error) {
    console.log("failed");
    res.status(500).json({
      error: "An error occurred while communicating with the Python API.",
    });
  }
});

const port = 3000; // Set the port you want to use
app.listen(port, () => {
  console.log(`Node.js server is running on port ${port}`);
});
