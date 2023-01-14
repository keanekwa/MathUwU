const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const db = require("./db")
const utils = require("./utils")
const passport = require("passport")
const session = require("express-session")
const cookieParser = require("cookie-parser")

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(
	cors({
		origin: "http://localhost:3001",
		credentials: true
	})
)
app.use(
	session({
		secret: "secretcode",
		resave: false
	})
)
app.use(cookieParser("secretcode"))
app.use(passport.initialize())
app.use(passport.session())
require("./passportConfig")(passport)

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

app.get("/user", (req: any, res: any) => {
	res.send(req.user) // The req.user stores the entire user that has been authenticated inside of it.
})

app.post("/login", async (req: any, res: any) => {
	let { username, password } = req.body
	if (!username || !password) {
		utils.sendBadRequestError(res, "Please enter all fields.")
		return
	}

	passport.authenticate("local", (err: any, user: any, info: any) => {
		if (err) utils.sendUnauthorizedError(res, err)
		else if (!user) utils.sendUnauthorizedError(res, "Authentication error.")
		else {
			req.login(user, (err: any) => {
				if (err) throw err
				utils.sendSuccess(res, "Login successful.", { username: user.username })
			})
		}
	})(req, res)
})

app.post("/logout", async (req: any, res: any) => {
	req.logout((err: any) => {
		if (err) console.log(err)
		utils.sendSuccess(res, "Logout successful.", {})
	})
})

app.listen(process.env.API_PORT, () => {
	console.log(`Example app listening on port ${process.env.API_PORT}`)
})

export {}
