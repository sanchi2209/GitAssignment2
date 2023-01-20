const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ObjectId=Schema.ObjectId


const userSchema=new Schema({   //strcture of thr mongodb 
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,min:6,max:12}
},{timestamps:true})

const postSchema=new Schema({
    title:{type:String},
    body:{type:String},
     User:{type:ObjectId,ref:'User'}
    // image: {'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
},{timestamps:true})
const User=mongoose.model('users',userSchema)
const Post=mongoose.model('posts',postSchema)
module.exports={User,Post}