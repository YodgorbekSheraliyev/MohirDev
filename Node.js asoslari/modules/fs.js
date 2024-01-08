const fs = require("fs");
const path = require("path");

//creating folder
// fs.mkdir(path.join(__dirname, "/folder"), {}, (err) => {
//     if(err) throw err;
//     console.log('Folder created');
// });

// creating file
// fs.writeFile(path.join(__dirname, '/folder', 'node.txt'), 'Node orqali file yaratildi', (err) => {
//     if(err) throw err;
//     console.log('File created');
// })
// appending to a file
// fs.appendFile(path.join(__dirname, '/folder', 'node.txt'), '\n12345', (err) => {
//     if(err) throw err;
//     console.log('File created');
// })

// fs.readFile(path.join(__dirname,  '/folder', 'node.txt'), 'utf8', (err, data) => {
//     if(err) throw err
//    console.log(data)
// })
fs.unlink(path.join(__dirname, '/folder', 'node.txt'), (err) => {
    if(err) throw err

})
fs.rmdir(path.join(__dirname, '/folder'), (err) => {
    if(err) throw err;
    console.log('DELETED');
})
fs.createReadStream(path.join(__dirname, 'path.js'), 'utf8')
