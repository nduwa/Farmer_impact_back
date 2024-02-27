import express from 'express'
import coffeePuchase from '../controllers/coffeePurchaseController'
import verifyToken from '../middlewares/auth'

const router = express.Router()

router.get('/dailyJournal', verifyToken, coffeePuchase.getSCDailyJournals)

export default router