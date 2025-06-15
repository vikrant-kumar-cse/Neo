const mongoose = require('mongoose');

const userTemplateSchema = new mongoose.Schema({
  userId: String,
  selectedTemplates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
});

module.exports = mongoose.model("UserTemplate", userTemplateSchema);
