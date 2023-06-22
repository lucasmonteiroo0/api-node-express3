const {Pool} = require('pg')

const pool = new Pool({
    connectionString:process.env.POSTGRES_URL +"?sslmode=require",
})

pool.connect((err) => {
    if(err) throw err
    console.log("Connect to PostgreSQL succesfully!")
})

module.exports = pool