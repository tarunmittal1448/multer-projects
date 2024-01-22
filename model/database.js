const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:String,
    file:String
})

module.exports=mongoose.model("blog", blogSchema);