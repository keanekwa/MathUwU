import React from "react"
import api from "./../../utils/api"

interface formDataType {
	[key: string]: string
}

const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault()

	const formData = new FormData(event.currentTarget as HTMLFormElement)
	const responseBody: formDataType = {}
	formData.forEach((value, property: string) => (responseBody[property] = value as string))

	const { username, password } = responseBody

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
				<input id="password" name="password" placeholder="Password" />
			</div>
			<button type="submit">Login</button>
		</form>
	)
}

export default Login
