import express from "express";
import GroupsController from "../controllers/groupController";
const groupsRouter = express.Router();

groupsRouter.get("/allGroups", GroupsController.getAllGroups);
export default groupsRouter;
