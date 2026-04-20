import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please provide a title book"],
      minLength: [1, "title length must be greater then zero"],
    },
    author: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please provide your name"],
      minLength: [1, "author name length must be greater then zero"],
    },
    genre: [String],
    year: Number,
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Book = model("Book", bookSchema);

export default Book;
