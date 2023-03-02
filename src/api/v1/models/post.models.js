import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  content: {
    type: String,
    
  },
  likes: {
    type: Number
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { 
  timestamps: true 
})

const Post = mongoose.model('Post', postSchema)

export default Post
