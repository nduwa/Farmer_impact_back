import express from 'express'
import TrainingAttendanceController from '../controllers/trainingAttendanceController'
const attendanceRouter = express.Router()


attendanceRouter.get("/allAttendance", TrainingAttendanceController.getAllTrainingAttendance)
attendanceRouter.get("/allAttendancesheet", TrainingAttendanceController.getAllTrainingAttendanceSheets)
export default attendanceRouter