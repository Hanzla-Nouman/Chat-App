export const sendMessage = async(req,res)=>{
   try {
    const message = req.body.message;
    const id = req.params.id;
    const senderId = req.userId
   } catch (error) {
    console.log(first)
    res.status(500).json({error:"Server Error"});
   }
}