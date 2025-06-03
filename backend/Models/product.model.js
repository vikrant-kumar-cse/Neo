const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        // Basic Product Information
        name: {
            type: String,
            required: [true, "Please enter a product name"],
        },
        description: {
            type: String,
            required: [true, "Please enter a product description"],
        },
        brand: {
            type: String,
            required: [true, "Please enter a product brand"],
        },
        category: {
            type: String,
            required: [true, "Please enter a product category"],
        },
        
        // Pricing & Inventory
        price: {
            type: Number,
            required: [true, "Please enter the product price"],
        },
        discount: {
            type: Number,
            required: [true, "Please enter the product discount"],
        },
        stock: {
            type: Number,
            required: [true, "Please enter the product stock"],
        },
        
        // Product Images (.glb model validation)
        images: {
            type: [String], // Array of strings (file names or URLs)
            required: [true, "Please upload at least one 3D model file (.glb,.fbx,.obj)"],
        },
        
        // Technical/Optional Details
        color: {
            type: String,
            required: [true, "Please enter the product color"],
        },
        size: {
            type: String,
            required: [true, "Please enter the product size"],
        },
        weight: {
            type: String,
            required: [true, "Please enter the product weight"],
        },
        
        // Store/Logistics Related
        store: {
            type: String,
            required: [true, "Please enter the store name"],
        },
        location: {
            type: String,
            required: [true, "Please enter the store location"],
        },
        
        // Product Status
        status: {
            type: String,
            required: [true, "Please enter the product status"],
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;