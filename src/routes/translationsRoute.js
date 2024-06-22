import express from "express";
import TranslationsController from "../controllers/translationsController";
import verifyToken from "../middlewares/auth";
const translationsRouter = express.Router();

translationsRouter.get(
  "/allTranslations",
  TranslationsController.getAllTransalations
);
translationsRouter.delete("/delete", TranslationsController.deleteTranslation);
translationsRouter.put("/update", TranslationsController.editTranslation);
translationsRouter.post(
  "/create",
  verifyToken,
  TranslationsController.addTranslation
);
export default translationsRouter;
