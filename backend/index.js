import express, { response } from "express";
import userRoutes from "./routes/users.js";
import fileRoutes from "./routes/files.js";
import authRoutes from "./routes/user-auth.js";
import { expressjwt } from "express-jwt";
import { getUserById } from "./controllers/users.js";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json())
app.use("/users", userRoutes);
app.use(
  expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"],
  }).unless({ path: /^\/auth/ })
);

app.use(async (request, _response, next) => {
  try {
    if (request.auth?.id) {
      const user = await getUserById(request.auth.id);

      if (!user) throw new Error("User not found");

      // Put user object in request object -> req.user
      request.user = user;
      return next();
    }

    next();
  } catch {
    const error = new CustomError("Internal server error.", 500);
    next(error);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to our multilingual file manager platform!");
});

app.use(express.json());
app.use("/files", fileRoutes);
app.use("/auth", authRoutes);

app.use((error, request, response, next) => {
  let { message, status } = error;

  if (error.name === "UnauthorizedError") status = 401;

  response.status(status || 500).json({ message });
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
