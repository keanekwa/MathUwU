const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const db = require("./db")
const utils = require("./utils")
// const passport = require("passport")
// const session = require("express-session")
// const cookieParser = require("cookie-parser")

dotenv.config()
const app = express()

// Middleware
app.use(express.json())
app.use(
	cors({
		origin: process.env.ENV === "PROD" ? process.env.WEB_HOST : process.env.WEB_HOST + ":" + process.env.WEB_PORT,
		credentials: true
	})
)
// app.set("trust proxy", 1)
// app.use(
// 	session({
// 		secret: "secretcode",
// 		saveUninitialized: false,
// 		resave: false,
// 		cookie: {
// 			maxAge: 30 * 24 * 60 * 60 * 1000,
// 			sameSite: "none"
// 		}
// 	})
// )
// app.use(cookieParser("secretcode"))
// app.use(passport.initialize())
// app.use(passport.session())
// require("./passportConfig")(passport)

// Routes
// interface RegisterReq {
// 	body: {
// 		username: string
// 		email: string
// 		hashedPassword: string
// 		hashedPassword2: string
// 	}
// }

// app.post("/register", async (req: RegisterReq, res: any) => {
// 	try {
// 		let { username, email, hashedPassword, hashedPassword2 } = req.body

// 		if (utils.checkEmpty([username, email, hashedPassword, hashedPassword2])) {
// 			utils.sendBadRequestError(res, "Please enter all fields.")
// 			return
// 		}

// 		if (username.length < 3 || username.length > 20) {
// 			utils.sendValidationError(res, "Username should be between 3 to 20 characters long.")
// 			return
// 		}

// 		if (hashedPassword !== hashedPassword2) {
// 			utils.sendValidationError(res, "Passwords do not match.")
// 			return
// 		}

// 		const existingUser = await db.query("SELECT * FROM users WHERE username = $1", [username])
// 		if (existingUser?.rows[0]) {
// 			utils.sendBadRequestError(res, "Username already exists.")
// 			return
// 		}

// 		const newUser = await db.query(
// 			"INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username, email",
// 			[username, email, hashedPassword]
// 		)

// 		utils.sendSuccess(res, "Successfully created user.", newUser.rows[0])
// 	} catch (err: any) {
// 		console.error(err.message)
// 	}
// })

// app.get("/user", (req: any, res: any) => {
// 	res.send(req.user) // The req.user stores the entire user that has been authenticated inside of it.
// })

// app.post("/login", async (req: any, res: any) => {
// 	let { username, password } = req.body
// 	if (utils.checkEmpty([username, password])) {
// 		utils.sendBadRequestError(res, "Please enter all fields.")
// 		return
// 	}

// 	passport.authenticate("local", (err: any, user: any, info: any) => {
// 		if (err) utils.sendUnauthorizedError(res, err)
// 		else if (!user) utils.sendUnauthorizedError(res, "Authentication error.")
// 		else {
// 			req.login(user, (err: any) => {
// 				if (err) throw err
// 				utils.sendSuccess(res, "Login successful.", { username: user.username })
// 			})
// 		}
// 	})(req, res)
// })

// app.post("/logout", async (req: any, res: any) => {
// 	req.logout((err: any) => {
// 		if (err) console.log(err)
// 		utils.sendSuccess(res, "Logout successful.", {})
// 	})
// })

// app.get("/scores", async (req: any, res: any) => {
// 	try {
// 		if (!req?.user?.username) {
// 			utils.sendUnauthorizedError(res, "User not logged in.")
// 			return
// 		}

// 		const { mode } = req.query
//		if (utils.checkEmpty([mode])) {
// 			utils.sendBadRequest(res, "Game mode not specified in score retrieval.")
// 			return
// 		}

// 		const scores = await db.query("SELECT * FROM scores WHERE username = $1 AND mode = $2 ORDER BY id DESC", [req.user.username, req.query.mode])

// 		utils.sendSuccess(res, "Successfully retrieved scores.", scores.rows)
// 	} catch (err: any) {
// 		console.error(err.message)
// 	}
// })

app.post("/scores", async (req: any, res: any) => {
	try {
		let { score, mode } = req.body

		if (utils.checkEmpty([score, mode])) {
			utils.sendBadRequestError(res, "Invalid score or game mode when saving score.")
			return
		}

		const newScore = req.user
			? await db.query("INSERT INTO scores (username, score, mode) VALUES ($1, $2, $3) RETURNING *", [
					req.user.username,
					score,
					mode
			  ])
			: await db.query("INSERT INTO scores (score, mode) VALUES ($1, $2) RETURNING *", [score, mode])

		utils.sendSuccess(res, "Successfully saved score.", newScore.rows[0])
	} catch (err: any) {
		console.error(err.message)
	}
})

app.get("/percentile", async (req: any, res: any) => {
	try {
		const { score, mode } = req.query

		if (utils.checkEmpty([score, mode])) {
			utils.sendBadRequestError(res, "Invalid score or game mode when checking for score percentile.")
			return
		}

		const percentile = await db.query(
			"SELECT percentiles.percent_rank FROM (SELECT score, PERCENT_RANK() OVER (ORDER BY score) FROM scores WHERE mode = $1 GROUP BY score) AS percentiles WHERE percentiles.score = $2",
			[mode, score]
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
