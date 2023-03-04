import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    //likes: {
    //    type: Number
    //},
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      }
}, {
    timestamps: true 
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment