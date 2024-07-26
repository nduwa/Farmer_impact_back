import express from "express";
import BucketsControler from "../controllers/bucketingController";

const bucketsRouter = express.Router();

bucketsRouter.get("/bucket", BucketsControler.getBucketByDayLotNumber);
bucketsRouter.put("/update", BucketsControler.updateBucketByDayLotNumber);
bucketsRouter.get("/bucketWeight", BucketsControler.getSingleBucketWeight);
bucketsRouter.put("/updateWeight", BucketsControler.updateTransactionBucketWeight);

export default bucketsRouter;
