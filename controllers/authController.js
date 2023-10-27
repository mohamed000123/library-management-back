import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();
function createToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: 3600 });
}

export function signup(req, res) {
  let newUser = new User(req.body);
  newUser.role = "user";
  newUser
    .save()
    .then(() => {
      //auth
      const token = createToken(newUser._id);
      res.cookie("jwt", token, {
        maxAge: 1000 * 3600,
        secure: true,
      });
      res.status(201).json({ user: newUser._id });
    })
    .catch((e) => {
      let message = e.message;
      message.includes("duplicate key error")
        ? (message = "allready used mail")
        : message.includes("email")
        ? (message = "please provide a valid e-mail")
        : (message = "password must be greater than 6 characters");
      res.status(400).json({ message });
    });
}
export const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            const token = createToken(user._id);
            res.cookie("jwt", token, {
              maxAge: 1000 * 3600,
              secure: true,
            });
            res.status(201).json({
              user: user._id,
              role: user.role,
              message: "Login successful",
            });
          } else {
            res.status(401).json({ message: "incorrect password" });
          }
        });
      } else {
        res.status(401).json({ message: "invalid e-mail" });
      }
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};

export const logout = (req, res) => {
  res.clearCookie("jwt", {
    sameSite: "none",
    secure: true,
  });
  res.send("Logged out successfully");
};

export const createAdmin = (req, res) => {
  let newUser = new User(req.body);
  newUser.role = "admin";
  newUser
    .save()
    .then(() => {
      res.status(200).json("admin account is created successfully");
    })
    .catch((er) => {
      res.status(401).json(`creating account error: ${er}`);
    });
};
