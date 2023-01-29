import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"

import { router } from "./routes/userRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/api/users', router)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))