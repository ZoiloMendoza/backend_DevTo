import Comment from '../models/comment.model'
import Post from '../models/post.models'

export class CommentController {
  async getAllComments(request, response, next) {
    try {
      const comm = await Comment.find({})
      response.status(200).send(comm)
    } catch (error) {
      next(error)
    }
  }

  async getComment(request, response, next) {
    try {
      const { id } = request.params//se optiene de la url de la petición
      const comm = await Comment.findById(id)
      if(!comm){
        response.status(404).send({
          error: 'No se encontro ningún registro en la base de datos'
        })
      }
      response.status(200).send(comm)
    } catch (error) {
      next(error)
    }
  }

  async createComment(request, response, next) {
    try {
      const { content, author, post } = request.body
      
      const newComment = new Comment({
        content,
        author,
        post
      })
      await newComment.save()

      const pos = await Post.findById({_id: newComment.post})
      pos.comments.push(newComment)

      await pos.save({ validateBeforeSave: false })//investigar

      response.status(201).send(newComment)

    } catch (error) {
      next(error)
    }
  }

  async updateComment(request, response, next) {
    try {
      const { id } = request.params
      const bodyRequst = {...request.body}
      const updateComment = await Comment.findByIdAndUpdate(id, bodyRequst, { new: true })//buscar que hace la parte final
      response.status(201).send(updateComment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(request, response, next) {
    try {
      const { id } = request.params
      const deleteComment = await Comment.findByIdAndDelete(id)
      if (!deleteComment) {
        response.status(404).send({
          error: "No se encontro el commentario en la base de datos"
      })} 
    response.status(200).send({message: "Registro eliminado correctamente"})
    
  } catch (error) {
    next(error)
    }
    }

}

export default new CommentController()