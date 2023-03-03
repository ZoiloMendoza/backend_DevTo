import Post from '../models/post.models'
import User from '../models/user.model'



export class PostController {
  async getAllPosts(request, response, next) {
    try {
      const posts = await Post.find({})
      response.status(200).send(posts).populate('author')
    } catch(error) {
      next(error)
    }
  }

  async getPost(request, response, next) {
    try {
      const { id } = request.params // se obtiene de la url de la peticion
      const post = await Post.findById(id)
  
      if (!post) {
        response.status(404).send({ 
          error: 'No se encontro ningún registro en la base de datos'
        })
      }
      response.status(200).send(post)
    } catch(error) {
      next(error)
    }
  }

 async createPost(request, response, next) {
  //agregar validacion si existe usuario
    try {
      const { title, content, author } = request.body
      const newPost = new Post({
        title,
        content,
        author
      })
      await newPost.save()
      console.log('new Post')
      const user = await User.findById({ _id: newPost.author })
      user.posts.push(newPost)
      await user.save({ validateBeforeSave: false })
      response.status(201).send(newPost)
    } catch(error) {
      next(error)
    }
  }

  async updatePost(request, response, next) {
    try {
      const { id } = request.params
      const bodyParams = { ...request.body }
      const updatedPost = await Post.findByIdAndUpdate(id, bodyParams, { new: true })
      console.log(updatedPost)
      response.status(201).send(updatedPost)
      next()
    } catch(error) {
      next(error)
    }
  }

  async deletePost(request, response, next) {
    try {
      const { id } = request.params
      const deletedPost = await Post.findByIdAndDelete(id)
      
      if (!deletedPost) {
        response.status(404).send({ 
          error: 'No se encontro ningún registro en la base de datos'
        })
      }
      
      response.status(200).send({ message: 'Registro eliminado correctamente'});
    } catch (error) {
      next(error)
    }
  }
}

export default new PostController()