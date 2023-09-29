const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");
const express = require("express")
const app = express();


app.set('view engine','ejs')
// nodejs lai form bata aako data parse gar vaneko ho 
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// DATABASE CONNECTION FUNCTION
connectDatabase()

app.use(express.static("public/css"))

// GET API -> /
app.get("/",(req,res)=>{
   res.render('home')
})
app.get("/about",(req,res)=>{
    res.render("about")
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
        //    status : 200,
           message : "Blogs fetched successfully",
           data : blogs
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
app.post("/createBlog",async (req,res)=>{
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

    res.json({
        status : 201,
        message : "Blog created succesfully"
    })
    // Alternative 
    // res.status(200).json({
    //     message : "Blog created successfully"
    // })
})

app.listen(2000,()=>{
    console.log("Nodejs has started at port 2000")
})