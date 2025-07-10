const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
    title:{
        type: String,
        required: true,
        minlength: [25, "Comment should be at least 25 characters"]
    },
   
    commentId:[{
        type:mongoose.Types.ObjectId,
        ref:'Comment'
    }] 
    
},{timestamps:true})

const Postmodel =mongoose.model('Post',PostSchema)

module.exports= Postmodel