const express=require('express')
const{body,validationResult}=require('express-validator')
const bodyParser=require('body-parser')
const bcrypt = require('bcrypt')
// const User=require('../module/user')
const {User} = require('../module/user')
const jwt=require('jsonwebtoken')
const secret='RESTAPI'

const router=express.Router()
router.use(bodyParser.json())

router.post('/post',async(req,res)=>{
    try{
        const Post = await Post.create({
            title:req.body.title,
            body:req.body.body,
            User:req.User
        })
        res.json({
            status:'Success',
            Post
        })
    }
    catch(e){
        res.status(500).json({
            status:'Failed',
             message:e.message
        })
    }
})

router.get('/post',(req,res)=>{
    res.send('ok')
})
module.exports=router