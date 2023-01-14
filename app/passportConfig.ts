const bcrypt = require("bcryptjs")
const localStrategy = require("passport-local").Strategy
const db = require("./db")

const findUserByUsername = async (username: string) => {
	const userQuery = await db.query("SELECT * FROM users WHERE username = $1", [username])
	const user = userQuery.rows[0]
	return user
}

const initPassport = (passport: any) => {
	passport.use(
		new localStrategy(async (username: string, password: string, done: Function) => {
			const user = await findUserByUsername(username)

			if (!user) return done("Incorrect username / password.", false)
			const checkPassword = await bcrypt.compare(password, user.password)

			if (!checkPassword) return done("Incorrect username / password.", false)
			else return done(null, user)
		})
	)

	passport.serializeUser((user: any, cb: Function) => {
		cb(null, user.username)
	})
	passport.deserializeUser(async (username: string, cb: Function) => {
		const user = await findUserByUsername(username)
		cb(null, user)
	})
}

module.exports = initPassport
