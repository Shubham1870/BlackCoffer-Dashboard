// apiRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the path to your data.json file
const dataFilePath = path.join(__dirname, '../data.json');

// Define the route to get the JSON data
router.get('/data', (req, res) => {
  try {
    const rawData = fs.readFileSync(dataFilePath);
    console.log('Raw Data:', rawData.toString());
    const jsonData = JSON.parse(rawData);
    res.json(jsonData);
  } catch (error) {
    console.error('Error handling /api/data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
