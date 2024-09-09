import express from "express";
import EvaluationController from "../controllers/evaluationController";

const evaluationRouter = express.Router();
evaluationRouter.get("/evaluations", EvaluationController.getAllEvaluations);
evaluationRouter.post("/question", EvaluationController.AddInspectionQuestion);

export default evaluationRouter;
