import express from "express";
import RegistrationsController from "../controllers/registrationControllers";
import verifyToken from "../middlewares/auth";
const registrationRoutes = express.Router();

registrationRoutes.get(
  "/registrations",
  verifyToken,
  RegistrationsController.getNewRegistrations
);
registrationRoutes.get(
  "/verified",
  verifyToken,
  RegistrationsController.getVerifiedRegistrations
);
registrationRoutes.get(
  "/approved",
  verifyToken,
  RegistrationsController.getApprovedRegistrations
);
registrationRoutes.put("/verify", RegistrationsController.verifyRegistration);
registrationRoutes.put(
  "/approve",
  verifyToken,
  RegistrationsController.ApproveRegistration
);
registrationRoutes.put(
  "/proceed",
  RegistrationsController.proceedRegistrations
);
registrationRoutes.delete("/:id", RegistrationsController.deleteRegistration);

export default registrationRoutes;
