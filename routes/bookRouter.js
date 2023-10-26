import express from "express";
import {
  addBook,
  search,
  deleteBook,
  editBook,
  allBooks,
  reserve,
  userBooks,
  reservedBooks,
  getBook,
  pinnedBooks,
  approveBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/add-book", addBook);
router.get("/books", allBooks);
router.get("/book/:ISBN", getBook);
router.get("/user-books", userBooks);
router.delete("/book/:ISBN", deleteBook);
router.put("/book/:ISBN", editBook);
router.post("/search", search);
router.post("/reserve/:ISBN", reserve);
router.get("/user-reserved-books", reservedBooks);
router.get("/pinned", pinnedBooks);
router.get("/approve/:ISBN", approveBook);
export default router;
