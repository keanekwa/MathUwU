import React from "react"
import api from "./../../utils/api"
import bcrypt from "bcryptjs-react"

interface formDataType {
	[key: string]: string
}

const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault()

	const formData = new FormData(event.currentTarget as HTMLFormElement)
	const responseBody: formDataType = {}
	formData.forEach((value, property: string) => (responseBody[property] = value as string))

	const { username, email, password, password2 } = responseBody
	const salt = bcrypt.genSaltSync(10)
	const hashedPassword = bcrypt.hashSync(password, salt)
	const hashedPassword2 = bcrypt.hashSync(password2, salt)

	api.post("/register", {
		username: username,
		email: email,
		hashedPassword: hashedPassword,
		hashedPassword2: hashedPassword2
	})
}

const Register = () => {
	return (
		<form onSubmit={handleRegister}>
			<div>
				<label htmlFor="username">Username </label>
				<input id="username" name="username" placeholder="Username" />
			</div>
			<div>
				<label>Email </label>
				<input id="email" name="email" placeholder="Email" />
			</div>
			<div>
				<label>Password </label>
				<input id="password" name="password" placeholder="Password" />
			</div>
			<div>
				<label>Repeat Password </label>
				<input id="password2" name="password2" placeholder="Repeat Password" />
			</div>
			<button type="submit">Register</button>
		</form>
	)
}

export default Register
