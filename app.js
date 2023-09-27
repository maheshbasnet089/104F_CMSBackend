const { connectDatabase } = require("./database/database");

const app = require("express")();



// DATABASE CONNECTION FUNCTION
connectDatabase()


// GET API -> /
app.get("/",(req,res)=>{
    res.json({
        status : 200,
        message : "Succcess"
    })
})


app.listen(2000,()=>{
    console.log("Nodejs has started at port 2000")
})