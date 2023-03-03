import User from '../models/user.model'

export class UserController {
  async getAllUsers(request, response, next) {
    try {
      const users =  await User.find({}).populate('posts')
      response.status(200).send(users)
    } catch (error) {
      next(error)
    }
    
  }

  async getUser(request, response, next) {
    try {
      const { id } = request.params;
      const user = await User.findById(id).populate('posts')
  
      if (!user) {
        response.status(404).send({ 
          error: 'No se encontro ningún registro en la base de datos'
        })
      }
      response.status(200).send(user)
    } catch (error) {
      next(error)  
    }
  }

  async createUser(request, response, next) {
    try {
      const { name, email, password, userPhoto } = request.body
      const newUser = new User({
        name,
        email,
        password,
        userPhoto
      })
      await newUser.save()
      response.status(201).send(newUser)
    } catch(error) {
      next(error)
    }
  }

  async updateUser(request, response, next) {
    try {
      const { id } = request.params
      const bodyParams = { ...request.body }
      const updatedUser = await User.findByIdAndUpdate(id, bodyParams, { new: true })
      response.status(201).send(updatedUser)
    } catch(error) {
      next(error)
    }

  }

  async deleteUser(request, response, next) {
    try {
      const { id } = request.params;
      const deletedUser = await User.findByIdAndDelete(id)
      
      if (!deletedUser) {
        response.status(404).send({ 
          error: 'No se encontro ningún registro en la base de datos'
        })
      }
      response.sendStatus(204);
    } catch(error) {
      next(error)
    }
  }
}

export default new UserController()