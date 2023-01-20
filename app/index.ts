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
		origin: process.env.WEB_HOST + ":" + process.env.WEB_PORT,
		credentials: true
	})
)
app.use(
	session({
		secret: "secretcode",
		saveUninitialized: false,
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

		if (utils.checkEmpty([username, email, hashedPassword, hashedPassword2])) {
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

		const existingUser = await db.query("SELECT * FROM users WHERE username = $1", [username])
		if (existingUser?.rows[0]) {
			utils.sendBadRequestError(res, "Username already exists.")
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
	if (utils.checkEmpty([username, password])) {
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

app.get("/scores", async (req: any, res: any) => {
	try {
		if (!req?.user?.username) {
			utils.sendUnauthorizedError(res, "User not logged in.")
			return
		}

		const scores = await db.query("SELECT * FROM scores WHERE username = $1 ORDER BY id DESC", [req.user.username])

		utils.sendSuccess(res, "Successfully retrieved scores.", scores.rows)
	} catch (err: any) {
		console.error(err.message)
	}
})

app.post("/scores", async (req: any, res: any) => {
	try {
		let { score } = req.body

		if (!req?.user?.username) {
			utils.sendUnauthorizedError(res, "User not logged in.")
			return
		}

		if (utils.checkEmpty([score])) {
			utils.sendBadRequestError(res, "Please enter all fields.")
			return
		}

		const newScore = await db.query("INSERT INTO scores (username, score) VALUES ($1, $2) RETURNING *", [
			req.user.username,
			score
		])

		utils.sendSuccess(res, "Successfully aved score.", newScore.rows[0])
	} catch (err: any) {
		console.error(err.message)
	}
})

app.get("/percentile/:score", async (req: any, res: any) => {
	try {
		const percentile = await db.query(
			"SELECT percentiles.percent_rank FROM (SELECT score, PERCENT_RANK() OVER (ORDER BY score) FROM scores GROUP BY score) AS percentiles WHERE percentiles.score = $1",
			[req?.params?.score]
		)

		utils.sendSuccess(res, "Successfully retrieved percentile.", percentile.rows[0])
	} catch (err: any) {
		console.error(err.message)
	}
})

app.listen(process.env.PORT, () => {
	console.log(`Example app listening on port ${process.env.PORT}`)
})

export {}
