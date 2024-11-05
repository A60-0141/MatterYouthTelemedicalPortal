//  const express = require('express');
//  const router = express.Router();
//  const multer = require('multer');
//  const path = require('path');
//  const auth = require('../middleware/auth');

// Configure Multer
//  const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
 //    },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
//  });

//  const upload = multer({ storage: storage });

// Upload document
//  router.post('/upload', auth, upload.single('document'), (req, res) => {
//     if (req.file) {
//         res.status(200).json({ message: 'Document uploaded successfully', file: req.file });
//     } else {
//         res.status(400).json({ message: 'File upload failed' });
//     }
//  });

// Download document
//  router.get('/download/:filename', auth, (req, res) => {
//     const file = path.join(__dirname, '../uploads/', req.params.filename);
//     res.download(file);
//  });

//  module.exports = router;

