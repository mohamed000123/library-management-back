import express from "express";
import {
  addBook,
  search,
  deleteBook,
  editBook,
  allBooks,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/add-book", addBook);
router.get("/books", allBooks);
router.delete("/book/:ISBN", deleteBook);
router.put("/book/:ISBN", editBook);
router.post("/search", search);
export default router;
