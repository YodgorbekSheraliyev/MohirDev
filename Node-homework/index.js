const http = require("http");
const path = require("path");
const fs = require("fs");

const booksPath = path.join(__dirname, "database", "books.json");

const bodyParser = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const generateId = (books) => {
  let id = 0;
  for (let i = 0; i < books.length; i++) {
    let element = books[i];
    if (id < element.id) {
      id = element.id;
    }
  }
  return id + 1;
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/books" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "Application/json" });
    fs.readFile(booksPath, "utf8", (err, data) => {
      if (err) throw err;
      const books = JSON.parse(data);
      const resp = { status: "OK", books };
      res.end(JSON.stringify(resp));
    });
  } else if (req.url === "/books" && req.method === "POST") {
    const bodyData = await bodyParser(req);
    const { title, author } = JSON.parse(bodyData);
    if(!title || !author){
        res.writeHead(400, {"Content-Type": "Application/json"})
        const resp = {status: 'Bad Request', message: 'title va author to\'ldirilishi kerak'}
        return res.end(JSON.stringify(resp))
    }
    fs.readFile(booksPath, "utf8", (err, data) => {
      if (err) throw err;
      let books = JSON.parse(data);

      const existBookTitle = books.find(b => b.title === title)

      if(existBookTitle){
        res.writeHead(200, { "Content-Type": "Application/json" });
        const resp = { status: "Bad reques", message: 'Bu title dagi kitob allaqachon mavjud'};
        return res.end(JSON.stringify(resp));
      }

      const newBook = { id: generateId(books), title, author };
      books.push(newBook);
      res.writeHead(200, { "Content-Type": "Application/json" });
      const resp = { status: "Created", books: newBook };

      res.end(JSON.stringify(resp));
    });
  } else if (req.url.match(/\/books\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[2];
    fs.readFile(booksPath, 'utf8', (err, data) => {
        if(err) throw err;
        const books = JSON.parse(data)
        const book = books.find((b) => b.id == id);
        if(!book){
        res.writeHead(200, { "Content-Type": "Application/json" });
         const resp = {status: 'Bad Request', message: 'Berilgan id bo\'yicha kitob topilmadi'}
            return res.end(JSON.stringify(resp))
        }
        res.writeHead(200, { "Content-Type": "Application/json" });
        const resp = { status: "OK", book };
        res.end(JSON.stringify(resp));
    }) 
  } else if (req.url.match(/\/books\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[2];
    const data = await bodyParser(req);
    const { title, author } = JSON.parse(data);

    if(!title || !author){
        res.writeHead(400, {"Content-Type": "Application/json"})
        const resp = {status: 'Bad Request', message: 'title va author to\'ldirilishi kerak'}
        return res.end(JSON.stringify(resp))
    }
    
    fs.readFile(booksPath, 'utf8', (err, data) => {
        if(err) throw err
        let books = JSON.parse(data);
        const existBookTitle = books.find((b) => b.title == title && b.id !== id);
        if(existBookTitle){
            res.writeHead(200, { "Content-Type": "Application/json" });
            const resp = {status: 'Bad Request', message: "Bu kitob allaqachon mavjud"}
            return res.end(JSON.stringify(resp))
         }

        const bookIndex = books.findIndex((b) => b.id == id);
        const [changedBook] = books.splice(bookIndex, 1)
        changedBook.title = title
        changedBook.author = author
        books.push(changedBook);

        fs.writeFile(booksPath, JSON.stringify(books), 'utf8', (err) => {
            if(err) throw err
            
            res.writeHead(200, { "Content-Type": "Application/json" });
            const resp = { status: "Updated", book: changedBook };
            res.end(JSON.stringify(resp));
        })

        
    })

   
  } else if (req.url.match(/\/books\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[2];

    fs.readFile(booksPath, "utf8", (err, data) => {
        if (err) throw err;
        const books = JSON.parse(data);
        const bookIndex = books.findIndex(b => b.id == id)
        if(bookIndex == -1){
            const resp = { status: "Bad request", message: 'Berilgan id bo\'yicha kitob topilmadi' };
            return res.end(JSON.stringify(resp));
        }
        const [deletedBook] = books.splice(bookIndex, 1)

        fs.writeFile(booksPath, JSON.stringify(books), (err) => {
            if(err) throw err
            const resp = { status: "Deleted", book: deletedBook };
            res.end(JSON.stringify(resp));
        })
      });
  }
});

server.listen(3000, () => console.log("Server running on port 3000"));
