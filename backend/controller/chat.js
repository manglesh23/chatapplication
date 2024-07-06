const { chats } = require("../data/data")

const chatbyid=async(req,res)=>{
    console.log(req.params.id);
    // console.log(chats)
    const chatforid= chats.filter(item=>item._id==req.params.id);
    console.log(chatforid);
    res.status(200).json({msg:chatforid});
}

module.exports={chatbyid}