import express from 'express'
import AccessControlController from '../controllers/accessControlController'
const accessControlRoutes = express.Router()

accessControlRoutes.get('/allAccessControl', AccessControlController.getAllAccessControl)



export default accessControlRoutes