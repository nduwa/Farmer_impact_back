import express from "express";
import DeliveryProcesingController from "../controllers/deliveryProcessingController";
import verifyToken from "../middlewares/auth";
const deliveryProcessingRouter = express.Router();

deliveryProcessingRouter.get(
  "/loadedweight/:id",
  DeliveryProcesingController.getLoadedWeightById
);
deliveryProcessingRouter.get(
  "/contributions_by_id/:id",
  DeliveryProcesingController.getProcessedContributionById
);
deliveryProcessingRouter.get(
  "/contributions/",verifyToken,
  DeliveryProcesingController.getProcessedContributions
);
deliveryProcessingRouter.post(
  "/start_processing",
  DeliveryProcesingController.startProcessing
);
export default deliveryProcessingRouter;
