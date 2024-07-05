require('dotenv').config();
const mongoose= require('mongoose');
const URI= process.env.MONGO_URI

const connectdatabase=async()=>{
    try{
        console.log("database connection successful");
       await mongoose.connect(URI);
    }catch(e){
        return{
            error:true,
            details:e
        }
    }
}
module.exports={connectdatabase};