const dotenv = require("dotenv")
const Pool = require("pg").Pool

dotenv.config()

const pool = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
})

module.exports = pool
