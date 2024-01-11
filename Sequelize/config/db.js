const {Pool} = require('pg')
const pool = new Pool({
    user: 'postgres',
    password: '5481',
    host: 'localhost',
    port: 5400,
    database: 'diarybook'
})

module.exports = pool