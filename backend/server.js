import express from "express"
import dotenv from "dotenv"

import { router } from "./routes/userRoutes.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use('/api/users', router)

app.listen(port, () => console.log(`Server started on port ${port}`))