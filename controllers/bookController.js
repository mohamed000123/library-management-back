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
    status: "pending",
  };
  Book.create(newBook)
    .then(() => {
      res
        .status(200)
        .json({ message: "book created successfully", success: "true" });
    })
    .catch((e) => {
      console.log(e);
      let message = e.message;
      message.includes("availableCopies")
        ? (message = "number of copies must be a number")
        : (message = "minimum allowable input characters length is 4");

      res.status(400).json({ message });
    });
}

export function availableBooks(req, res) {
  const userId = req.userId;
  Book.find({
    $and: [
      { addedBy: { $not: { $eq: userId } } },
      { borrowedBy: { $not: { $eq: userId } } },
      { status: { $not: { $eq: "pending" } } },
      { availableCopies: { $not: { $eq: 0 } } },
    ],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
      res.json(e);
    });
}

export function pinnedBooks(req, res) {
  Book.find({
    status: "pending",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
      res.json(e);
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
      res
        .status(200)
        .json({ message: "book updated successfully", success: "true" });
    })
    .catch((err) => {
      res.json(err);
    });
}

export function getBook(req, res) {
  Book.findOne({ ISBN: req.params.ISBN })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json(err);
    });
}

export function reserve(req, res) {
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

export function reservedBooks(req, res) {
  const userId = req.userId;
  Book.find({ borrowedBy: userId })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json(err);
    });
}

export function approveBook(req, res) {
  Book.findOneAndUpdate({ ISBN: req.params.ISBN }, { status: "aproved" })
    .then((data) => {
      res
        .status(200)
        .json({ message: "book approved successfully", success: "true" });
    })
    .catch((err) => {
      res.json(err);
    });
}

export function bookSearch(req, res) {
  const keyword = req.params.keyword;
  const userId = req.userId;
  Book.find({
    $and: [
      { addedBy: { $not: { $eq: userId } } },
      { borrowedBy: { $not: { $eq: userId } } },
      { status: { $not: { $eq: "pending" } } },
      { availableCopies: { $not: { $eq: 0 } } },
    ],
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { author: { $regex: keyword, $options: "i" } },
    ],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    });
}
