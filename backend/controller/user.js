const { chats } = require("../data/data");


const signup=async(req,res)=>{
    console.log(req);
   
    res.status(200).json({msg:"signup"});
}

const userlogin=async(req,res)=>{
    res.status(200).json({msg:chats});
    // console.log(chats)
}



module.exports={signup,userlogin}