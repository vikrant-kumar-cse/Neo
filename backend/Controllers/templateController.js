const Template = require("../Models/BusinessInfo");
const UserTemplate = require("../Models/BusinessInfo");

exports.getAllTemplates = async (req, res) => {
  const templates = await Template.find();
  res.json(templates);
};

exports.saveUserTemplates = async (req, res) => {
  const { userId, selectedTemplateIds } = req.body;

  const userTemplates = await UserTemplate.findOneAndUpdate(
    { userId },
    { selectedTemplates: selectedTemplateIds },
    { upsert: true, new: true }
  );

  res.json({ message: "Templates saved", data: userTemplates });
};

exports.getUserTemplates = async (req, res) => {
  const { userId } = req.params;
  const result = await UserTemplate.findOne({ userId }).populate("selectedTemplates");
  res.json(result?.selectedTemplates || []);
};
