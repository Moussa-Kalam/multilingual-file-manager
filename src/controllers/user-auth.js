import { sign } from "jsonwebtoken";
import { findUserByEmailModel } from "../models/users";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = findUserByEmailModel(email);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;

      return next(error);
    }

    const passwordsMatch = password === user.password;

    if (!passwordsMatch) {
      const error = new Error("Email or password is incorrect");
      error.status = 401;

      return next(error);
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ user, token });
  } catch {
    const error = new Error("Internal server error");
    next(error);
  }
};
