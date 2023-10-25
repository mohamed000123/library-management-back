import Book from "./../models/book.js";
import { v4 as uuidv4 } from "uuid";
export function addBook(req, res) {
  const { title, author, description, availableCopies } = req.body;
  const addedBy = req.userId;
  const newBook = {
    ISBN: uuidv4(),
    title,
    author,
    description,
    availableCopies,
    addedBy,
  };
  Book.create(newBook)
    .then(() => {
      res
        .status(200)
        .json({ message: "book created successfully", success: "true" });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
}

export function allBooks(req, res) {
  const userId = req.userId;
  Book.find({ addedBy: { $not: { $eq: userId } } }).then((data) => {
    res.json(data);
  });
}

export function userBooks(req, res) {
  const userId = req.userId;
  Book.find({ addedBy: userId }).then((data) => {
    res.json(data);
  });
}

export function deleteBook(req, res) {
  Book.deleteOne({ ISBN: req.params.ISBN })
    .then(() => {
      res.status(200).json("book deleted successfully");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

export function editBook(req, res) {
  Book.findOneAndUpdate({ ISBN: req.params.ISBN }, req.body)
    .then((data) => {
      res.status(200).json("book updated successfully");
    })
    .catch((err) => {
      res.json(err);
    });
}

export function search(req, res) {
  const query = req.body.query;
  Book.find({
    $or: [
      { ISBN: query },
      { title: { $regex: query, $options: "i" } },
      {
        author: { $regex: query, $options: "i" },
      },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

export function reserve(req, res) {
  const userType = req.type;
  console.log(userType);
  const userId = req.userId;
  const bookISBN = req.params.ISBN;
  Book.findOne({ ISBN: bookISBN }).then((book) => {
    const availableCopiesNumber = book.availableCopies;
    availableCopiesNumber > 0
      ? Book.findOneAndUpdate(
          { ISBN: bookISBN },
          { borrowedBy: userId, $inc: { availableCopies: -1 } }
        )
          .then((data) => {
            res.status(200).json("book reserved successfully");
          })
          .catch((err) => {
            res.json(err);
          })
      : res.status(200).json("sorry this book is not available right now");
  });
}
