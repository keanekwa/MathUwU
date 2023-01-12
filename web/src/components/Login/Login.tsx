import React from "react"
import api from "./../../utils/api"
import getFormData from "./../../utils/getFormData"

const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault()
	const { username, password } = getFormData(event)

	api.post("/login", {
		username: username,
		password: password
	})
}

const Login = () => {
	return (
		<form onSubmit={handleLogin}>
			<div>
				<label htmlFor="username">Username </label>
				<input id="username" name="username" placeholder="Username" />
			</div>
			<div>
				<label>Password </label>
				<input id="password" name="password" type="password" placeholder="Password" />
			</div>
			<button type="submit">Login</button>
		</form>
	)
}

export default Login
