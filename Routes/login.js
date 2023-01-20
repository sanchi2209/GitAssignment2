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


//1.user id and password needed
//2.validate he data
//3.check user already exists
//user is new need to register
router.post('/register',body('email').isEmail(),body('password').isLength({min:8,max:12}),
body('name').isAlpha(),async(req,res)=>{
    try{
        const errors=validationResult(req)
        if(!errors.isEmpty){
            return res.status(400).json({errors:errors.array()})
        }
        const{name,email,password}=req.body;
        const user=await User.find('email')
        if(user){
            return res.status(400).json({status:'failed',message:'user already exists'})
        }
        bcrypt.hash(password,10,async function(err,hash){
            if(err){
                return res.status(400).json({status:'Failed',message:e.message})
            }
            const data= await User.create({
                name,
                email,
                password:hash
            })
            return res.status(200).json({status:'Sucess',message:'User successfuully registerd',data})
        })
    }
    catch{
        return res.status(400).json({status:'Failed',message:'Registration =unsuccessful'})
    }
})
//  ----------------------regstration finish-------------------
//----------------------login is start------------------------//
router.post('/login',body("email").isEmail,async (req,res)=>{
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty){
            return res.status(400).json({errors:errors.array()})
        }
        const{name,email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({status:'failed',message:'user already exists'})
        }
         bcrypt.compare(password,user.password,async function(err,result){
                if(!err){
                    return res.status(400).json({status:"failed",message:e.message})
                }
                if(result){
                  const token= jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: 'foobar'
                      }, secret)
                    return res.status(200).json({status:"Sucess",message:'user login Successfully',token})
                }
                else {
                    return res.status(400).json({
                        status: "Failed",
                        message: "Invalid credentails"
                    })
                }  
         })
    }
    catch{
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})
module.exports=router