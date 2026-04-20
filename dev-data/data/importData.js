import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv({ path: "../../config.env" });
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Book from "../../models/bookModel.js";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const booksFile = path.join(dirName, "books.json");

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log("DB connection successfully"));

const books = JSON.parse(fs.readFileSync(booksFile, "utf-8"));

async function importData() {
  try {
    await Book.create(books);
    console.log("data loaded");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
}

async function deleteData() {
  try {
    await Book.deleteMany();
    console.log("data deleted");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
}

if (process.argv[2] === "delete") {
  deleteData();
}
if (process.argv[2] === "import") {
  importData();
}
