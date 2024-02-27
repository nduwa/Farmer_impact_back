import express from 'express'
import coffeePuchase from '../controllers/coffeePurchaseController'
import verifyToken from '../middlewares/auth'

const router = express.Router()

router.get('/dailyJournal', verifyToken, coffeePuchase.getSCDailyJournals)
router.get('/dailyJournal/:journalId', verifyToken, coffeePuchase.getSCDailyJournalsByJournalId)

export default router