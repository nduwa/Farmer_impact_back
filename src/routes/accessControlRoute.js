import express from "express";
import AccessControlController from "../controllers/accessControlController";
import verifyToken from "../middlewares/auth";
const accessControlRoutes = express.Router();

accessControlRoutes.get(
  "/allAccessControl",
  AccessControlController.getAllAccessControl
);
accessControlRoutes.get(
  "/access/mobile",
  verifyToken,
  AccessControlController.mobileAccessControl
);
accessControlRoutes.post(
  "/assignPermissions",
  AccessControlController.assignPermissionsToUser
);
accessControlRoutes.put("/update", AccessControlController.editModule);
accessControlRoutes.post("/create", AccessControlController.createModule);
accessControlRoutes.get(
  "/assigned",
  verifyToken,
  AccessControlController.getAssignedModules
);

export default accessControlRoutes;
