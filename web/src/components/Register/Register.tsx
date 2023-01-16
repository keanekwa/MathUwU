import React from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import api from "./../../utils/api"
import bcrypt from "bcryptjs-react"
import getFormData from "./../../utils/getFormData"

const handleRegister = async (event: React.FormEvent<HTMLFormElement>, navigate: NavigateFunction) => {
	event.preventDefault()

	const { username, email, password, password2 } = getFormData(event)
	const salt = bcrypt.genSaltSync(12)
	const hashedPassword = bcrypt.hashSync(password, salt)
	const hashedPassword2 = bcrypt.hashSync(password2, salt)

	try {
		await api.post("/register", {
			username: username,
			email: email,
			hashedPassword: hashedPassword,
			hashedPassword2: hashedPassword2
		})

		navigate("/")
	} catch (err: any) {
		const errMessage = err?.response?.data?.message
		alert(errMessage)
	}
}

const Register = () => {
	const navigate = useNavigate()

	return (
		<form onSubmit={(event) => handleRegister(event, navigate)}>
			<div>
				<label htmlFor="username">Username </label>
				<input id="username" name="username" placeholder="Username" required />
			</div>
			<div>
				<label>Email </label>
				<input id="email" name="email" type="email" placeholder="Email" required />
			</div>
			<div>
				<label>Password </label>
				<input id="password" name="password" type="password" placeholder="Password" required />
			</div>
			<div>
				<label>Repeat Password </label>
				<input id="password2" name="password2" type="password" placeholder="Repeat Password" required />
			</div>
			<button className="btn" type="submit">
				Register
			</button>
		</form>
	)
}

export default Register
