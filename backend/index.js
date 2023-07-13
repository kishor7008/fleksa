const express=require("express")
const cors=require("cors")
const connection=require("./connection/connection")
const route=require('./routes/route')
const app=express()
app.use(express.json())

app.use(cors())


connection()

app.use('/',route)

app.listen(4000,()=>{
    console.log("server started 4000")
})