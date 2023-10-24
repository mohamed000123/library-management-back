import express from "express";
import {
  addBook,
  search,
  deleteBook,
  editBook,
  allBooks,
  reserve,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/add-book", addBook);
router.get("/books", allBooks);
router.delete("/book/:ISBN", deleteBook);
router.put("/book/:ISBN", editBook);
router.post("/search", search);
router.post("/reserve/:ISBN", reserve);
export default router;
