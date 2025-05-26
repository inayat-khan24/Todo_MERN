import { Todomodel } from "../mongoose/mongoose.js"

export const userInput = async(req,res)=>{
    const {name} = req.body
    try {
    const data = new Todomodel({name})
    await data.save()
   res.status(201).json(data)
    }  catch (error) {
   console.log(error)
    res.status(500).json({ error: error.message }); 
}
}

// find data 
export const findData = async(req,res)=>{
   try {
      const user =  await Todomodel.find()
//         if (!user|| user.length === 0){
//     return res.status(404).json({massage : "user data not found"})
//   }
      res.status(200).json(user)

   } catch (error) {
    res.status(500).json({ error: error.message }); 
   }
}


/// for update user 
export const updateUser = async(req,res)=>{
    const {id} = req.params
    try {
        const updated =  await Todomodel.findByIdAndUpdate(id,req.body,{new:true})
        
       
       res.status(200).json(updated) 
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message }); 
    }


}

export const deleted = async(req,res)=>{
const {id} = req.params
try {
  await Todomodel.findByIdAndDelete(id);;
 res.status(200).json("user has been deleted")

    
} catch (error) {
 res.status(500).json({ error: error.message }); 
}

}