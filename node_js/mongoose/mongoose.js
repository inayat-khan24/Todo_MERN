import mongoose from "mongoose";

try {
     await mongoose.connect("mongodb://localhost:27017/Todo")
     mongoose.set({"debug":true})
} catch (error) {
    console.log(error)
    
}

const TodoSchema = mongoose.Schema({
    name : {type : String , required:true,}

})

export const Todomodel = mongoose.model("user",TodoSchema)



