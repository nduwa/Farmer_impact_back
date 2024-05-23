import express from 'express'
import AccessControlController from '../controllers/accessControlController'
const accessControlRoutes = express.Router()

accessControlRoutes.get('/allAccessControl', AccessControlController.getAllAccessControl)
accessControlRoutes.post('/assignPermissions', AccessControlController.assignPermissionsToUser)
accessControlRoutes.put('/update', AccessControlController.editModule)
accessControlRoutes.post('/create', AccessControlController.createModule)



export default accessControlRoutes