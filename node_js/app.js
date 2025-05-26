import express  from "express"
import cors from "cors"
import Router from "./routes/routes.js"
const app = express()


app.use(cors())
app.use(express.json())

app.use('/',Router)

const PORT = 5000


app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`))