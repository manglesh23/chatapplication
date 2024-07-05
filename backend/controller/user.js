const signup=async(req,res)=>{
    console.log(req);
    res.status(200).json({msg:"signup"});
}

const userlogin=async(req,res)=>{
    res.status(200).json({msg:"login"});
}

module.exports={signup,userlogin}