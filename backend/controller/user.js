const { chats } = require("../data/data");
const { generateToken } = require("../middleware/generateToken");
const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      res.status(404);
      throw new Error("please provide all the data input");
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(400).json({ msg: "already exists" });
      throw new Error("USer Exists, Email should be unique");
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: "failed to register" });
    }
  } catch (e) {
    console.log(e);
  }
};

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkuser = await User.findOne({ email: email });
    if (!checkuser || !checkuser.matchPassword(password)) {
      res.status(404).json({ msg: "Incorrect password" });
    }
    res.status(200).json({ msg: "Login Successful" });
   
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const getalluser= async(req,res)=>{
    try{
      const keyword=req.query;
      console.log("Keywords:-",keyword);
        // let getAllUser= await User.find();
        // res.status(200).json({msg:getAllUser});

    }catch(e){
        return{
            error:true,
            details:e
        }
    }
}

module.exports = { registerUser, userlogin ,getalluser};
