const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");
const express = require("express")
const app = express();
const cors = require("cors")

app.use(cors({
    origin : "http://localhost:5173",

}))


// nodejs lai form bata aako data parse gar vaneko ho 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// DATABASE CONNECTION FUNCTION
connectDatabase()


// GET API -> /
app.get("/",(req,res)=>{
   res.json({
    message : "I am alive"
   })
})


// GET API => /blogs (All blogs)
app.get("/blogs",async (req,res)=>{
    // fetching/reading all Blogs from Blog model
   const blogs =  await Blog.find()
   // check if blogs contains data or not
   if(blogs.length == 0){
    res.status(404).json({
        // status : 404,
        message : "Empty blogs"
    })
   }else{
       res.status(200).json({
        
           message : "Blogs fetched successfully",
           blogs : blogs
        })
    }
})

// GET API -> /blogs/:id (single Blog)
app.get("/blogs/:id",async (req,res)=>{
   const id = req.params.id
//    console.log(id)
//    const {id} = req.params ALTERNATIVE
//    const blog = await Blog.find({_id :id})
//    if(blog.length == 0){
//     res.status(404).json({
//         message : "No blogs found with that id"
//     })
//    }else{

//        res.status(200).json({
//            messge : "Blog fetched successfully",
//            data : blog
//         })
//     }
    // ALTERNATIVE 
    const blog = await Blog.findById(id)
    if(blog){
        res.status(200).json({
            message : "Blog fetched succesfully",
            data : blog
        })
    }else{
        res.status(404).json({
            message : "No blog found"
        })
    }

})


// CREATE BLOG API  
app.post("/blogs", async(req,res)=>{
   const title = req.body.title;
   const subTitle = req.body.subTitle 
   const description = req.body.description

//    Alternative (object destructuring)
//    const {title,subTitle,description} = req.body

    // Insert to database logic goes here 
   await Blog.create({
        title : title  ,
        subTitle : subTitle,
        description : description
    })
    

    res.status(201).json({
      
        message : "Blog created succesfully"
    })
    // Alternative 
    // res.status(200).json({
    //     message : "Blog created successfully"
    // })
})



// UPDATE BLOG API 
app.patch("/blogs/:id",async (req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description
    
    // const {title,subTitle,description} = req.body  ALTERNATIVE
    

    await Blog.findByIdAndUpdate(id,{
        title : title,
        subTitle : subTitle,
        description : description
    })

    res.status(200).json({
        message : "Blog updated Succesfully"
    })

})

// DELETE API 
app.delete("/blogs/:id",async (req,res)=>{
    const id = req.params.id
    // const {id} = req.params 

    await Blog.findByIdAndDelete(id)

    res.status(200).json({
        message : "Blog Deleted Successfully"
    })
})




app.listen(2000,()=>{
    console.log("Nodejs has started at port 2000")
})