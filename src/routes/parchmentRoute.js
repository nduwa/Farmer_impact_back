import express from 'express'
import ParchmentController from '../controllers/apparchmentController'
import verifyToken from '../middlewares/auth';
const parchmentRoutes = express.Router()

parchmentRoutes.post('/assign',ParchmentController.assignNewParchment);
parchmentRoutes.post('/parchGrade',verifyToken,ParchmentController.assignParchmentGrade)
parchmentRoutes.get('/allAssignedParchments', ParchmentController.getAllAssignedParchments)
parchmentRoutes.put('/adjust', ParchmentController.adjustParchment)

export default parchmentRoutes