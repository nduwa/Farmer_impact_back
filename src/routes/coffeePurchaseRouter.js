import express from "express";
import coffeePuchase from "../controllers/coffeePurchaseController";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get("/dailyJournal", verifyToken, coffeePuchase.getSCDailyJournals);
router.get(
  "/dailyJournal/:journalId",
  verifyToken,
  coffeePuchase.getSCDailyJournalsByJournalId
);
router.get(
  "/dailyJournal/transaction/:id",
  verifyToken,
  coffeePuchase.getTransactionById
);
router.put(
  "/dailyJournal/transaction/:id",
  verifyToken,
  coffeePuchase.removeTransaction
);
router.put(
  "/dailyJournal/transaction/update/:id",
  verifyToken,
  coffeePuchase.updateTransaction
);
router.post(
  "/dailyJournal/commissions",
  verifyToken,
  coffeePuchase.addCommissions
);
// router.get("/dailyJournal/daylots", coffeePuchase.getAllDayLot);
router.put(
  "/dailyJournal/journal/approve/:journalId",
  verifyToken,
  coffeePuchase.approveJournal
);
router.get(
  "/dailyJournal/journal/:cherryLotId",
  verifyToken,
  coffeePuchase.getWSCDailyJournalsByDate
);
router.post(
  "/dailyJournal/journalBucket",
  verifyToken,
  coffeePuchase.AddTransactionBucket
);
router.post('/bucketweight', coffeePuchase.TransactionBucketWeight)
router.get('/dryweighting',coffeePuchase.getAllBucketWeighting)
//router.put('/closeAndSubmit/:cherryLotId',coffeePuchase.CloseAndSubmitTransaction)


export default router;
