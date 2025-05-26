import express from "express";
import { userInput,updateUser, findData,deleted} from "../controller/controller.js";

const Router = express.Router()


 Router.post("/user",userInput)

 Router.get("/user/find",findData)

 Router.put("/user/find/:id",updateUser)

 Router.delete("/user/find/:id",deleted)

 export default Router;