const express = require('express');
const Model = require('../model/admins');
const upload = require('../middleware/upload');
const router = express.Router()
  

//Post Method
router.post('/', upload.single('file'), async (req, res) => {

    const data = new Model({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        file: req.file.filename
        
        
    })
    try {
        const newData = await data.save() 
        res.status(201).json(newData)
        console.log(req.file)

    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
})

//Get all Method
router.get('/', async (req, res) => {
   try {
        const allData = await Model.find();
        res.json(allData)
    } catch (error) {
        res.status(500).json({ message: error });
    }
    
})

//FUNCTION FOR GET/UPDATE/DELETE WITH ID
const getId = async (req, res, next)=>{
    let data
    try {
        data = await Model.findById(req.params.id)
        if(data == null){
            return res.status(404).json({message: 'Cannot Find Id'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.data = data
    next()
}

//Get by ID Method
router.get('/:id', getId, async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

//Update by ID Method
router.patch('/:id', getId, async (req, res) => {
    if(req.body.firstname != null){
        res.data.firstname = req.body.firstname
    }
    if(req.body.lastname != null){
        res.data.lastname = req.body.lastname
    }
    if(req.body.email != null){
        res.data.email = req.body.email
    }
    try {
        const updatedData = await res.data.save()
        res.json(updatedData)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

//Delete by ID Method
router.delete('/:id', getId, async (req, res) => {
    try {
        await res.data.remove()
        res.json({message:'Successfuly Deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


module.exports = router

