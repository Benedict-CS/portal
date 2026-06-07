const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for any navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portal service is running at:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  console.log(`- Network: http://0.0.0.0:${PORT}`);
});
