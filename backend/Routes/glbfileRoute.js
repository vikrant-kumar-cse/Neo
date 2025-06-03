const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure storage to preserve file extensions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to /uploads
  },
  filename: (req, file, cb) => {
    // Keep the original filename with a timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter to allow .glb, .fbx, and .obj files only
const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = ['.glb', '.fbx', '.obj','.mlt'];

  if (!allowedExtensions.includes(extname)) {
    return cb(new Error('Only .glb, .fbx, and .obj files are allowed'), false);
  }

  cb(null, true);
};

// Setup multer with custom storage and file filter
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 
});

// Upload route
router.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or invalid file format' });
  }

  // Generate the accessible file URL
  const fileUrl = `/uploads/${req.file.filename}`;

  res.json({ 
    message: 'File uploaded successfully!', 
    fileUrl: fileUrl,
    fileName: req.file.filename
  });
});

module.exports = router;
