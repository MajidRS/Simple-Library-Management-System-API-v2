import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION ERROR 💥 shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

import app from "./app.js";

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log("DB connect successfully"));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`App running on ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION ERROR 💥 shutting down...");
  console.log(err.name, err.message);
  server.on("close", () => {
    process.exit(1);
  });
});
