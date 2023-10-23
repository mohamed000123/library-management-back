import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  ISBN: {
    type: String,
    required: true,
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
const Book = mongoose.model("book", bookSchema);
export default Book;
