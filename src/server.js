import express from "express";
import "express-async-errors";
import "./container";
import indexRouter from "./routes/index";
import uploadConfig from "./config/upload";
import "./database";

const app = express();

const PORT = 5050;

app.use(express.json());
app.use("/files", express.static(uploadConfig.dir));
app.use(indexRouter);

app.listen(PORT, () =>
  console.log(`=> Server is running on http://localhost:${PORT}`)
);
