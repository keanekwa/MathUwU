const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const db = require("./db")
const utils = require("./utils")
const bcrypt = require("bcryptjs")

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
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
			utils.sendBadRequestError(res, "Please enter all fields.")
			return
		}

		if (username.length < 3 || username.length > 20) {
			utils.sendValidationError(res, "Username should be between 3 to 20 characters long.")
			return
		}

		if (hashedPassword !== hashedPassword2) {
			utils.sendValidationError(res, "Passwords do not match.")
			return
		}

		const newUser = await db.query(
			"INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username, email",
			[username, email, hashedPassword]
		)

		utils.sendSuccess(res, "Successfully created user.", newUser.rows[0])
	} catch (err: any) {
		console.error(err.message)
	}
})

interface LoginReq {
	body: {
		username: string
		password: string
	}
}

app.post("/login", async (req: LoginReq, res: any) => {
	try {
		// Check if request is valid
		let { username, password } = req.body
		if (!username || !password) {
			utils.sendBadRequestError(res, "Please enter all fields.")
			return
		}

		// Check if user exists in DB
		const userQuery = await db.query("SELECT password FROM users WHERE username = $1", [username])
		const user = userQuery.rows[0]
		if (!user) {
			utils.sendUnauthorizedError(res, "User does not exist.")
			return
		}

		// Check if password exists in DB
		const hashedPassword = user.password
		if (!hashedPassword) {
			utils.sendUnauthorizedError(res, "Username / password is wrong.")
			return
		}

		// Check if password entered matches DB record
		const passwordCheck = await bcrypt.compare(password, hashedPassword)
		if (passwordCheck) {
			utils.sendSuccess(res, "Login successful.", { username: username })
		} else {
			utils.sendUnauthorizedError(res, "Username / password is wrong.")
		}
	} catch (err: any) {
		console.error(err.message)
	}
})

app.listen(process.env.API_PORT, () => {
	console.log(`Example app listening on port ${process.env.API_PORT}`)
})

export {}
