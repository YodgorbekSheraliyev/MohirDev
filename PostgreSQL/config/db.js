const  Pool  = require("pg").Pool

const pool = new Pool({
    user: 'postgres',
    password: '5481',
    database: 'user_list',
    host: 'localhost',
    port: 5400
})

module.exports = pool