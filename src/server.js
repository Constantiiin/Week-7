require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connection is working");
};

connection();

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
  },
  genre: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

const logTypeOfResult = async (result) => {
  console.log(`typeof result: ${typeof result} - result: ${result}`);
};

app.post("/books/addBook", async (request, response) => {
  console.log("request.body: ", request.body);
  const book = await Book.create({
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
    //title: "The Dark",
    // author: "James Mitchel ",
    // genre: "Drama",
  });

  response.send({ message: "Your book has been created", book: book });
});

app.put("/books", async (request, response) => {
  console.log("request.body: ", request.body);
  const updateBook = await Book.findOneAndUpdate({
    title: request.body.title,
    author: request.body.author,
    genre: request.bodyy.genre,
  });

  response.send({ message: "Success: Author updated" });
});
app.get("/books/getfirstbook", async (request, response) => {
  const book = await Book.find();
  response.send({ message: "Book found", book: book });
});

app.delete("/books", async (request, response) => {
  const book = await Book.deleteOne({ title: request.body.title });
  response.send({ message: "book deleted", book: book });
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001");
});
