const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const booksPath = path.join(__dirname, "database", "books.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function generateId(books) {
  let id = 0;
  for (let index = 0; index < books.length; index++) {
    const element = books[index];
    if (id < element.id) {
      id = element.id;
    }
  }
  return id + 1;
}

app.get("/books", (req, res) => {
  fs.readFile(booksPath, "utf8", (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  fs.readFile(booksPath, "utf8", (err, data) => {
    if (err) throw err;
    const books = JSON.parse(data);
    const book = books.find((b) => b.id === bookId);
    if (book) {
      return res.send(book);
    }
    res.send("Ma'lumot topilmadi");
  });
});

app.post("/books", (req, res) => {
  fs.readFile(booksPath, "utf8", (err, data) => {
    if (err) throw err;
    let books = JSON.parse(data);
    const { title, author } = req.body;
    if (!title || !author) {
      res.setHeader("Content-Type", "Application/json");
      return res.status(400).send("title va author to'ldirilishi kerak");
    }
    const existTitle = books.find((b) => b.title === title);
    if (existTitle) {
      res.setHeader("Content-Type", "Application/json");
      return res.status(400).send(" Bu title dagi kitob allaqachon qo'shilgan");
    }
    let newBook = { id: generateId(books), title, author };

    books.push(newBook);
    fs.writeFile(booksPath, JSON.stringify(books), (err) => {
      if (err) throw err;
      res.json({ message: "Muvaffaqiyatli qo'shildi", data: newBook });
    });
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  fs.readFile(booksPath, "utf8", (err, data) => {
    if (err) throw err;
    let books = JSON.parse(data);
    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex == -1) {
      res.setHeader("Content-Type", "Application/json");
      return res.send("Bu id dagi kitob topilmadi");
    }
    const { title, author } = req.body;
    if (!title || !author) {
      res.setHeader("Content-Type", "Application/json");
      return res.status(400).send("title va author to'ldirilishi kerak");
    }
    const existTitle = books.find((b) => b.title === title && b.id !== bookId);
    if (existTitle) {
      res.setHeader("Content-Type", "Application/json");
      return res.status(400).send(" Bu title dagi kitob allaqachon qo'shilgan");
    }
    let [updatingBook] = books.splice(bookIndex, 1);
    updatingBook.title = title;
    updatingBook.author = author;

    books.push(updatingBook);
    fs.writeFile(booksPath, JSON.stringify(books), (err) => {
      if (err) throw err;
      res.json({ message: "Muvaffaqiyatli yangilandi", data: updatingBook });
    });
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  fs.readFile(booksPath, "utf8", (err, data) => {
    const books = JSON.parse(data);
    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex == -1) {
      res.setHeader("Content-Type", "Application/json");
      return res.send("Bu id dagi kitob topilmadi");
    }
    const [deletedBook] = books.splice(bookIndex, 1);
    fs.writeFile(booksPath, JSON.stringify(books), 'utf8', err => {
        if(err) throw err
        res.json({message: 'Ma\'lumot muvaffaqiyatli o\'chirildi', data: deletedBook})
    })
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port: ", PORT));
