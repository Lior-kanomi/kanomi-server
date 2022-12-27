const express = require('express');
const router = express.Router();

// Default route
router.get('/api/', (req, res) => {
  res.send('This is the default API route');
});

// Route for catching user queries
router.get('/api/:query', (req, res) => {
  // Extract the query from the request
  const query = req.params.query;

  // Save the query to the database
  // TODO: Add code to save the query to the database

  res.send(`Received query: ${query}`);
});

module.exports = router;
