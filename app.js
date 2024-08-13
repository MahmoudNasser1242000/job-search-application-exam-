import express from "express"
import dbconnection from "./dbConnection/dbConnection.js"
import AppError from "./utils/errorClass.js"
import userRouter from "./src/modules/users/user.routes.js"
import companyRouter from "./src/modules/company/company.routes.js"
import jobRouter from "./src/modules/jobs/job.routes.js"
import dotenv from "dotenv"
import cors from "cors"

// create server
const app = express()
app.use(express.json())

//cors police
app.use(cors())

// multer file upload
app.use(express.static('Users_Resumes'))

// .env config
dotenv.config()

// database connection
dbconnection()

// routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/jobs", jobRouter)

// server entry point path
app.get('/', (req, res) => {
    res.status(200).json({ msg: "welcome to our job search application" })
})

// not found page
app.use('*', (req, res, next) => {
    next(new AppError("404 page not found", 404));
})

// global error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ msg: 'Error', error: err.message })
})

// server listen on port...
const port = process.env.SERVER_LISTEN_PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))