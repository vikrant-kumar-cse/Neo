const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const Product =require("../Models/product.model");
const router = require('express').Router();


// Create A Product
router.post('/api/product',ensureAuthenticated, async(req,res)=>
{
    try{
          const product= await Product.create(req.body);
          res.status(200).json(product)
      }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
});


// Get Product

router.get('/api/product',ensureAuthenticated,async(req,res)=>
{
    try{
        const product= await Product.find({});
        res.status(200).json(product);
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

// Get Product By Id

router.get('/api/product/:id',ensureAuthenticated,async(req,res)=>
{
    try{
          const{id}=req.params;
          const product=await Product.findById(id);
          res.status(200).json(product)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

//Update Product By Id

router.put('/api/product/:id',ensureAuthenticated,async (req,res)=>
    {
        try{
            const {id}=req.params;
            const product= await Product.findByIdAndUpdate(id,req.body);
            if(!product){
                return res.status(404).json({message:"Product Not Found"});
            }
    
            const updateproduct =await Product.findById(id);
            res.status(200).json(updateproduct);
        }catch(error)
        {
            res.status(500).json({message:error.message})
        }
    })


const fs = require('fs');
const path = require('path');

router.delete('/api/product/:id', ensureAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    // Step 1: Find the product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    // Step 2: Delete associated .glb file (ONLY that product's file)
    if (product.images && product.images.length > 0) {
      const imageUrl = product.images[0]; // example: http://localhost:8080/uploads/filename.glb
      const filename = imageUrl.split('/').pop(); // extract 'filename.glb'

      const filePath = path.join(__dirname, '..', 'uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // delete the file
        console.log(`Deleted GLB file: ${filename}`);
      } else {
        console.warn(`GLB file not found: ${filePath}`);
      }
    }

    // Step 3: Now delete the product itself
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product and associated GLB file deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
});
// Export the router
module.exports=router;
