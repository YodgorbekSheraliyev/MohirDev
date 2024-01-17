const express = require('express')
const cors = require('cors');

const app = express()

// Blog post
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next()
// })
app.use(cors())

// Init routes
app.use('/posts', require('./routes/post.route'))

app.listen(3000, () => console.log('Server running on port: 3000'))