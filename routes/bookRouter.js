import express from "express";
import {
  addBook,
  deleteBook,
  editBook,
  availableBooks,
  reserve,
  userBooks,
  reservedBooks,
  getBook,
  pinnedBooks,
  approveBook,
  bookSearch,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/add-book", addBook);
router.get("/available-books", availableBooks);
router.get("/book/:ISBN", getBook);
router.get("/user-books", userBooks);
router.delete("/book/:ISBN", deleteBook);
router.put("/book/:ISBN", editBook);
router.post("/reserve/:ISBN", reserve);
router.get("/user-reserved-books", reservedBooks);
router.get("/pinned", pinnedBooks);
router.get("/approve/:ISBN", approveBook);
router.get("/search/:keyword?", bookSearch);
export default router;
