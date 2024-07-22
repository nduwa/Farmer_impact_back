import express from "express";
import RegistrationsController from "../controllers/registrationControllers";
const registrationRoutes = express.Router();

registrationRoutes.get(
  "/registrations",
  RegistrationsController.getNewRegistrations
);
registrationRoutes.put("/verify", RegistrationsController.verifyRegistration);
registrationRoutes.put("/approve", RegistrationsController.ApproveRegistration);
registrationRoutes.put("/proceed", RegistrationsController.proceedRegistrations);

export default registrationRoutes;
