import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  userPhoto: {
    type: String,
  },
  password: {
    type: String,
    minLength: 8
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
}, { 
  timestamps: true 
})

const User = mongoose.model('User', userSchema)

export default User
