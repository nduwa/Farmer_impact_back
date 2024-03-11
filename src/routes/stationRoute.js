import express from 'express'
import StationControler from '../controllers/stationController'
const stationRoutes = express.Router()

stationRoutes.get('/stations', StationControler.getAllStations)




export default stationRoutes