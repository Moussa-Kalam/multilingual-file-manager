import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { findUserByEmailModel } from "../models/users.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [user] = await findUserByEmailModel(email);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;

      return next(error);
    }

  
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      const error = new Error("Email or password is incorrect");
      error.status = 401;

      return next(error);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
console.log("user and token", {user,token})
    res.json({ user, token });
  } catch(err) {
    const error = new Error("Internal server error");
    console.log("error",err)
    next(error);
  }
};
