import Book from "../models/bookModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";

const getAllBooks = catchAsync(async (req, res, next) => {
  const feature = new APIFeatures(Book.find(), req.query)
    .filter()
    .sort()
    .fieldLimiting()
    .pagination();
  const books = await feature.query;
  res.status(200).json({
    status: "success",
    result: books.length,
    data: {
      books,
    },
  });
});

const getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

const createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      book: newBook,
    },
  });
});

const updateBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!newBook) {
    return next(new AppError("No book found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      book: newBook,
    },
  });
});

const deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: {
      book: null,
    },
  });
});

export { getAllBooks, getBook, createBook, updateBook, deleteBook };
