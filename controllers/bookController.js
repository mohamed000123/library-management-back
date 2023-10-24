import Book from "./../models/book.js";
import { v4 as uuidv4 } from "uuid";
export function addBook(req, res) {
  const { title, author, description, availableCopies } = req.body;
  const newBook = {
    ISBN: uuidv4(),
    title,
    author,
    description,
    availableCopies,
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
  Book.find().then((data) => {
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
