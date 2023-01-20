const dotenv = require("dotenv")
const Pool = require("pg").Pool

dotenv.config()

const pool = new Pool({
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	port: process.env.PGPORT,
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD
})

module.exports = pool
