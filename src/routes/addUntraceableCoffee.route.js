import express from "express";
import AddUntraceableCoffeeController from "../controllers/addUntraceableCoffeeController";
import verifyToken from "../middlewares/auth";
const untraceableCoffeeRoute = express.Router();

untraceableCoffeeRoute.post(
  "/add",
  verifyToken,
  AddUntraceableCoffeeController.addUntraceableCoffee
);

export default untraceableCoffeeRoute;
