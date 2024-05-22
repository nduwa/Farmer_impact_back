import express from "express";
import UserAccessController from "../controllers/userAccessController";
const UserAccessRouter = express.Router();

UserAccessRouter.post("/create", UserAccessController.addUser);
UserAccessRouter.get("/alluseraccess", UserAccessController.getAllUserAccess);
UserAccessRouter.put("/activate", UserAccessController.activateUser);
export default UserAccessRouter;
