import express from "express";

import { configDotenv } from "dotenv";
configDotenv({ path: "./config.env" });

import path from "path";
import { fileURLToPath } from "url";

import qs from "qs";

import bookRouter from "./routes/bookRoute.js";
import AppError from "./utils/appError.js";
import globalErrorsHandler from "./controllers/errorController.js";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const staticFilePath = path.join(dirName, "public");

const app = express();

app.use(express.json());
app.use(express.static(staticFilePath));

app.set("query parser", (str) => qs.parse(str));

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.use("/api/v1/books", bookRouter);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Does not exist ${req.originalUrl} on this server`));
});

app.use(globalErrorsHandler);

export default app;
