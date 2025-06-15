const mongoose = require('mongoose');

const BusinessInfoSchema = new mongoose.Schema({
  brandId: { type: Number, required: true, unique: true },
  companyName: { type: String, required: true },
  tradeLicenseUrl: { type: String },
  countryAndEmirates: { type: String, required: true },
  profileAtCompany: { type: String, required: true },
  primaryContactName: { type: String, required: true },
  primaryContactPhone: { type: String, required: true },
  businessPhone: { type: String, required: false },
  vatNumber: { type: String },
  brandLogoUrl: { type: String },
  brandName: { type: String, required: true },
  brandWebsite: { type: String },
  brandCountryAndEmirates: { type: String, required: true },
  facebook: { type: String },
  instagram: { type: String },
  brandFormat: {
    type: String,
    enum: ['Single Brand', 'Multi Brand'],
    required: true
  },  
  termsAccepted: { type: Boolean, default: false },
  privacyPolicyAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BusinessInfo', BusinessInfoSchema);



