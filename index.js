import express from "express";
import cors from "cors";

const app = express();

app.listen("8000", () => {
  console.log("server is running on port 8000");
});

// middelwares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
