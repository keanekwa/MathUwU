const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const db = require("./db")

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get("/", (req: any, res: any) => {
	res.send("Hello World!")
})

interface RegisterReq {
	body: {
		username: string
		email: string
		hashedPassword: string
		hashedPassword2: string
	}
}

app.post("/register", async (req: RegisterReq, res: any) => {
	try {
		let { username, email, hashedPassword, hashedPassword2 } = req.body

		if (!username || !email || !hashedPassword || !hashedPassword2) {
			res.send({ message: "Please enter all fields." })
			return
		}

		if (username.length < 3 || username.length > 20) {
			res.send({ message: "Username should be between 3 to 20 characters long." })
			return
		}

		if (hashedPassword !== hashedPassword2) {
			res.send({ message: "Passwords do not match." })
			return
		}

		const newUser = await db.query(
			"INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING (username, email)",
			[username, email, hashedPassword]
		)

		res.json(newUser.rows[0])
	} catch (err: any) {
		console.error(err.message)
	}
})

app.listen(process.env.API_PORT, () => {
	console.log(`Example app listening on port ${process.env.API_PORT}`)
})

export {}
