const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const Template = require('../Models/Template');
const UserTemplate = require('../Models/UserTemplate');

// Create uploads folder if not exists
const uploadPath = path.join(__dirname, '../uploads/templates');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ✅ Create Template (name + image)
router.post('/create-template', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: "Image file is required." });
      }

    const imageUrl = `/uploads/templates/${req.file.filename}`; // relative path to serve later

    const newTemplate = new Template({ name, imageUrl });
    await newTemplate.save();

    res.status(201).json({ message: 'Template created successfully', template: newTemplate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all templates
router.get('/all-templates', async (req, res) => {
    try {
      const templates = await Template.find();
      res.status(200).json(templates);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Save selected templates by user
  router.post('/save-user-templates', async (req, res) => {
    try {
      const { userId, templateIds } = req.body;
  
      // Upsert user templates
      const userTemplate = await UserTemplate.findOneAndUpdate(
        { userId },
        { selectedTemplates: templateIds },
        { new: true, upsert: true }
      ).populate('selectedTemplates');
  
      res.status(200).json({ message: 'User templates saved', userTemplate });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get selected templates of a user
  router.get('/user-templates/:userId', async (req, res) => {
    try {
      const userTemplate = await UserTemplate.findOne({ userId: req.params.userId }).populate('selectedTemplates');
      if (!userTemplate) {
        return res.status(404).json({ message: 'No templates found for this user' });
      }
      res.status(200).json(userTemplate);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;