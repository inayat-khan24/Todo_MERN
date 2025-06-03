import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

try {

     await mongoose.connect(process.env.MONGODN_URL)
     mongoose.set({"debug":true})
     console.log("connected successful")
} catch (error) {
    console.log(error)
    console.log("not connected")
    
}

const TodoSchema = mongoose.Schema({
    name : {type : String , required:true,}

})

export const Todomodel = mongoose.model("user",TodoSchema)



