import express from 'express'
import coffeePuchase from '../controllers/coffeePurchaseController'
import verifyToken from '../middlewares/auth'

const router = express.Router()

router.get('/dailyJournal', verifyToken, coffeePuchase.getSCDailyJournals)
router.get('/dailyJournal/:journalId', verifyToken, coffeePuchase.getSCDailyJournalsByJournalId)
router.get('/dailyJournal/transaction/:id', verifyToken, coffeePuchase.getTransactionById)
router.put('/dailyJournal/transaction/:id', verifyToken, coffeePuchase.updateTransactionById)

export default router