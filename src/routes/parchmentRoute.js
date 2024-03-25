import express from 'express'
import DryingControler from '../controllers/apparchmentController'
const parchmentRoutes = express.Router()

parchmentRoutes.post('/assign',DryingControler.assignNewParchment);
export default parchmentRoutes