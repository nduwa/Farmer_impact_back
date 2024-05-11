import express from "express";
import DeliveryProcesingController from "../controllers/deliveryProcessingController";
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
  "/contributions/",
  DeliveryProcesingController.getProcessedContributions
);
deliveryProcessingRouter.post(
  "/start_processing",
  DeliveryProcesingController.startProcessing
);
export default deliveryProcessingRouter;
