// index.js
var express = require('express');
var cors = require('cors');
require('dotenv').config();

var app = express();

// Enable CORS so that the API is remotely testable
app.use(cors());

// Serve static assets from the /public folder
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the HTML file for the homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ------------------------------
// File Upload Handling with Multer
// ------------------------------
var multer = require('multer');
// Configure Multer: files are stored in the "uploads" directory temporarily.
var upload = multer({ dest: 'uploads/' });

// POST endpoint to handle file uploads.
// The file input field in the form must have the name attribute "upfile".
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // If no file is uploaded, return an error.
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Respond with a JSON object containing the file metadata.
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
