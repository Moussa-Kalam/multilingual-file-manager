import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";
import { body } from "express-validator";

const userRoutes = express.Router();

userRoutes.get("/", getUsers);

userRoutes.get("/:id", getUserById);

userRoutes.post(
  "/",
  [
    body("email").notEmpty({ ignore_whitespace: false }),
    body("password").notEmpty({ ignore_whitespace: false }),
    body("confirmPassword")
      .notEmpty({ ignore_whitespace: true })
      .custom((value, { req }) => value === req.body.password),
  ],
  createUser
);

userRoutes.put("/:id", updateUser);

userRoutes.delete("/:id", deleteUser);

export default userRoutes;
