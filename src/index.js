import express, { response } from "express";
import userRoutes from "./routes/users.js";
import fileRoutes from "./routes/files.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to our multilingual file manager platform!");
});

app.use(express.json());
app.use("/users", userRoutes);
app.use("/files", fileRoutes);

app.use((error, request, response, next) => {
  const { message, status } = error;

  response.status(status || 500).json({ message });
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
