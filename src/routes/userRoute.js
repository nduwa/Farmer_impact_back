import express from "express";
import UserController from "../controllers/userController.js";
const userRoutes = express.Router();

userRoutes.get("/allUsers", UserController.getAllUsers);
userRoutes.post("/login", UserController.login);
userRoutes.post("/signup", UserController.createUser);
userRoutes.put("/update/:userId", UserController.updateUser);
userRoutes.get("/user/:userId", UserController.getSingleUser);
userRoutes.get("/staff", UserController.getAllStaff);

export default userRoutes;
