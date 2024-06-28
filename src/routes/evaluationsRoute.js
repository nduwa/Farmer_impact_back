import express from "express";
import EvaluationController from "../controllers/evaluationController";

const evaluationRouter = express.Router();
evaluationRouter.get("/evaluations", EvaluationController.getAllEvaluations);

export default evaluationRouter;
