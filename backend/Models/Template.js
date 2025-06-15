const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

module.exports = mongoose.model("Template", templateSchema);
