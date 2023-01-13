import React from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import api from "./../../utils/api"
import getFormData from "./../../utils/getFormData"

const handleLogin = async (event: React.FormEvent<HTMLFormElement>, navigate: NavigateFunction) => {
	event.preventDefault()
	const { username, password } = getFormData(event)

	try {
		await api.post("/login", {
			username: username,
			password: password
		})

		navigate("/")
	} catch (err: any) {
		const errMessage = err?.response?.data?.message
		alert(errMessage)
	}
}

const Login = () => {
	const navigate = useNavigate()

	return (
		<form onSubmit={(event) => handleLogin(event, navigate)}>
			<div>
				<label htmlFor="username">Username </label>
				<input id="username" name="username" placeholder="Username" required />
			</div>
			<div>
				<label>Password </label>
				<input id="password" name="password" type="password" placeholder="Password" required />
			</div>
			<button type="submit">Login</button>
		</form>
	)
}

export default Login
