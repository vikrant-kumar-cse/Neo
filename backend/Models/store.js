const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: [true, "Please enter store name"],
    },
    description: {
      type: String,
      required: [true, "Please enter store description"],
    },
    ownerName: {
      type: String,
      required: [true, "Please enter owner's name"],
    },
    ownerEmail: {
      type: String,
      required: [true, "Please enter owner's email"],
    },
    logoUrl: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;
