import express from "express";
import fs from "fs"
import cookieParser from "cookie-parser";

const app = express()



app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

app.get('/',(res,req)=>{
    let htmlFile = fs.readFileSync('./src/homepage.html','utf-8')
    req.setHeader('Content-Type', 'text/html')
    req.send(htmlFile)
})

//User Routes
import userRoutes from "./routes/user.route.js"
app.use("/api/v1/users",userRoutes)

//Course Routes
import courseRoutes from "./routes/course.route.js"
app.use("/api/v1/courses", courseRoutes)

export  {app}