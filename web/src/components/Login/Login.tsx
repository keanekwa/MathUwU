import React, { useContext } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import api from "./../../utils/api"
import getFormData from "./../../utils/getFormData"
import { Context } from "../../App"

const handleLogin = async (
	event: React.FormEvent<HTMLFormElement>,
	navigate: NavigateFunction,
	setContext: Function
) => {
	event.preventDefault()
	const { username, password } = getFormData(event)

	try {
		const res = await api.post("/login", {
			username: username,
			password: password
		})
		const user = res?.data?.response
		setContext({ user: user })

		navigate("/")
	} catch (err: any) {
		const errMessage = err?.response?.data?.message
		alert(errMessage)
	}
}

const Login = () => {
	const [, setContext] = useContext(Context)
	const navigate = useNavigate()

	return (
		<form onSubmit={(event) => handleLogin(event, navigate, setContext)}>
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
