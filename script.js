const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const blog=require("./model/database");

app.use("/uploads",express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "static")));

app.set("view engine", "hbs");



app.post("/uploads-file", upload.single('image'), async(req, res)=>{
    console.log(req.body);
    console.log(req.file);
    const {title} = req.body;
    const {path} = req.file;
    const newBlog = new blog({title, file:path});
    await newBlog.save();
    res.end("file upload successfull");
});

app.get("/blogs", async(req, res)=>{
    const blogs=await blog.find();
    res.render("blog", {blogs});
});

mongoose.connect("mongodb://127.0.0.1:27017/g26multer").then(()=>{
    app.listen(1024, ()=>{
        console.log("Server is started at 8080");
    });
});