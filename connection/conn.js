const mongoose=require('mongoose')
async function getConnection(){
    await mongoose.connect('mongodb://localhost/assignment')
    //mongoose.set('strictQuery', true);
   // const err = new MongooseError(message);
   console.log('db is connected');
}
module.exports=getConnection