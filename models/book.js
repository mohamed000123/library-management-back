import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  author: {
    type: String,
    required: true,
    minlength: 4,
  },
  description: {
    type: String,
    required: true,
    minlength: 4,
  },
  availableCopies: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved"],
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
const Book = mongoose.model("book", bookSchema);
export default Book;
