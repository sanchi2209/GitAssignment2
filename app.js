const express=require('express')
const app=express()
const conn=require("./connection/conn")
const mongoose=require('mongoose')
// const User=require('./module/user')

const userRoutes=require('./Routes/user')
const loginRoutes=require('./Routes/login')
const postRoutes=require('./Routes/post')
const {Post}=require('./module/user')
conn()
const jwt = require('jsonwebtoken')

//console.log(conn)
//exxpress middleware
app.post('/api/v1/post',(req,res,next)=>{
     const token=req.headers.authorization?.split("Bearer")[1]; //my token will go inthe header part 
     //token have  3 types 
     //header
     //payload
     //VERIFY SIGNATURE
    if(token){ //verfiy token 
        jwt.verify(token, 'shhhhh', function(err, decoded) {
            if(err){
                return res.status(401).json({
                    status:'failed',
                    message:'token is not vaild'})
            }
            
            req.user=decoded.data;
            next();
          });
    }
    else{
        res.status(401).json({
            status:'failed',
            message:'user is not authenticated'
        })
    }
     console.log(token)  //
     next(); //it will take to the actual route
})

app.use('/api/v1/user',userRoutes)
app.use('/api/v1',loginRoutes)
app.use('/api/v1/post',postRoutes)

// app.get('*',(req,res)=>{
//    res.status(404).send("API IS NOT FOUND");
// })

app.listen(3000,()=>console.log('server is up at 3000'))
