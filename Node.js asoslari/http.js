const http = require("http");
const fs = require('fs')

const server = http.createServer((req, res) => {
  if(req.url == '/'){
    res.end(`
    <html>
     <head><title>Send message</title></head>
     <body>
     <form action='/message' action='POST'>
     <input type='text' name='message'/>
     <button type='submit'>Send</button>
     </form>
     </body>
    </html>`)
  }else if(req.url == '/users'){
    res.end('<h1>Users page</h1>')
  }else {
    res.end('Not Found')
  }
  if(req.url === '/message' && req.method === 'POST'){
    const body = []
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk)
    })

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      console.log(parsedBody);
      fs.writeFileSync('message.txt', parsedBody.split('=')[1]);
    })
    res.end()
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => console.log("Server running on port: ", port));
