import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  }
  // { _id: false }
);
const Book = mongoose.model("book", bookSchema);
export default Book;
