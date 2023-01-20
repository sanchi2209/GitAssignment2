const bodyParser = require('body-parser')
const express=require('express')
const {User}=require('../module/user')
const router=express.Router()

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json())


router.get('/posts',async(req,res)=>{
    try{
        let data =await User.find()
        console.log(data)
        res.status(200).json({status:'Sucess',data})
    }
    catch(e){
        res.status(500).json({status:'Failed',message:e.message}) 
    }
})

router.post('/posts',async(req,res)=>{
    try{
        let data =await User.create(req.body)
        console.log(data)
        res.status(200).json({status:'Sucess',data})
    }
    catch(e){
        res.status(500).json({status:'Failed',message:e.message}) 
    }
})
router.put('/posts/:postId',async(req,res)=>{
    try{
        await User.updateOne({_id:req.params.id},req.body)
       let data= await User.findOne({_id:req.params.id})
        console.log(data)
        res.status(200).json({status:'Sucess',data})
    }
    catch(e){
        res.status(200).json({status:'Failed',message:e.message}) 
    }
})
router.delete('/posts/:postId',async(req,res)=>{
    try{
        // await User.updateOne({_id:req.params.id},req.body)
       let data= await User.deleteOne({_id:req.params.id})
        console.log(data)
        res.status(200).json({status:'Sucess',data})
    }
    catch(e){
        res.status(200).json({status:'Failed',message:e.message}) 
    }
})

module.exports=router