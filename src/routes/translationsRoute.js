import express from "express";
import TranslationsController from "../controllers/translationsController";
const translationsRouter = express.Router();

translationsRouter.get(
  "/allTranslations",
  TranslationsController.getAllTransalations
);
translationsRouter.delete("/delete", TranslationsController.deleteTranslation);
translationsRouter.put("/update", TranslationsController.editTranslation);
translationsRouter.post("/create", TranslationsController.addTranslation);
export default translationsRouter;
