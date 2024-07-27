import { validationResult } from "express-validator";
import {
  createUserModel,
  deleteUserModel,
  getUserByIdModel,
  getUsersModel,
  updateUserModel,
} from "../models/users.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await getUsersModel();

    res.json({ users });
  } catch {
    const error = new Error("Internal server error");
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserByIdModel(id);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;

      return next(error);
    }

    res.json({ user });
  } catch {
    const error = new Error("Internal server error");
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const error = new Error("Validation errors");

      return next(error);
    }

    const { email, password } = req.body;

    const userWithSameEmail = await findUserByEmail(email);

    if (userWithSameEmail.length > 0) {
      const error = new Error("User with the same email already exists");
      error.status = 409;

      return next(error);
    }

    await createUserModel({
      email: email,
      password: password,
    });

    res.status(201).json({
      message: `The user with ${email} has been added!`,
    });
  } catch {
    const error = new Error("Internal server error");

    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const updatedUser = await updateUserModel(id, req.body);

    if (!updateUser) {
      const error = new Error("User not found");

      return next(error);
    }

    res.json({ user: updatedUser });
  } catch {
    const error = new Error("Internal server error");
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const deletedUser = await deleteUserModel(id);

    if (!deletedUser) {
      const error = new Error("User not found");

      return next(error);
    }

    res.status(204);
  } catch {
    const error = new Error("Internal server error");
    next(error);
  }
};
