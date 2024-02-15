import express from 'express'
import UserController from '../controllers/userController.js'
const userRoutes = express.Router()

userRoutes.get('/allUsers', UserController.getAllUsers)
userRoutes.post('/login', UserController.login)
userRoutes.post('/signup', UserController.createUser)


export default userRoutes