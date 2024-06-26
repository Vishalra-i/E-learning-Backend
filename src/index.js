import connectDB from "./db/index.db.js";
import app from "./app.js";

connectDB()
.then(()=>{
    app.listen((process.env.PORT || 8000),()=>{
        console.log(`Server is running on Port: http://localhost:${process.env.PORT}`)
    })  
})
.catch((err)=>{
    console.log(`MongoDB Connection Failed:: ${err}`)
})
