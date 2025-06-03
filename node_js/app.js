import express  from "express"
import cors from "cors"
import Router from "./routes/routes.js"
import dotenv from 'dotenv'

dotenv.config()
const app = express()


app.use(cors())
app.use(express.json())

app.use('/',Router)

const PORT = process.env.PORT


app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`))