const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const Store =require("../Models/store");
const router = require('express').Router();

//Store Create
router.post('/api/store', ensureAuthenticated,async (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    try{
        const store= await Store.create(req.body);
        res.status(200).json(store)
    }catch(error){
        res.status(500).json({message:error.message})
    }
});


// Get Store
router.get('/api/store',ensureAuthenticated,async (req,res)=>{

    try{
       const store=await Store.find({});
       res.status(200).json(store);
        
    }catch(error){
        res.status(500).json({message:error.message})
    }

})


//Get Store By Id
router.get('/api/store/:id',ensureAuthenticated,async (req,res)=>{
    try{
        const {id}= req.params;
         const store= await Store.findById(id);
        res.status(200).json(store);
    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
})


// Update A Store
router.put('/api/store/:id',ensureAuthenticated,async (req,res)=>
{
    try{
        const {id}=req.params;
        const store= await Store.findByIdAndUpdate(id,req.body);
        if(!store){
            return res.status(404).json({message:"Store Not Found"});
        }

        const updatestore =await Store.findById(id);
        res.status(200).json(updatestore);
    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
})


// Detete Store
router.delete('/api/store/:id',ensureAuthenticated,async (req,res)=>
{
    try{
          const {id}= req.params;
          const store = await Store.findByIdAndDelete(id);
          if(!store){
            return res.status(404).json({message:"Store Not Found"});
            }
          res.status(200).json({message:"Store Deleted Successfully"});
    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

module.exports = router;

