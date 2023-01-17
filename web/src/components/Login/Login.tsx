import React, { useContext } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import api from "./../../utils/api"
import getFormData from "./../../utils/getFormData"
import { AlertContext, UserContext } from "../../App"

const handleLogin = async (
	event: React.FormEvent<HTMLFormElement>,
	navigate: NavigateFunction,
	setUser: Function,
	setAlert: Function
) => {
	event.preventDefault()
	const { username, password } = getFormData(event)

	try {
		const res = await api.post("/login", {
			username: username,
			password: password
		})
		const user = res?.data?.response
		setUser(user?.username)

		navigate("/")
	} catch (err: any) {
		const errMessage = err?.response?.data?.message
		setAlert({ show: true, message: errMessage })
	}
}

const Login = () => {
	const [, setUser] = useContext(UserContext)
	const [, setAlert] = useContext(AlertContext)
	const navigate = useNavigate()

	return (
		<form onSubmit={(event) => handleLogin(event, navigate, setUser, setAlert)}>
			<div className="mb-2">
				<label className="inline-block w-32 mr-5" htmlFor="username">
					Username
				</label>
				<input className="input" id="username" name="username" placeholder="Username" />
			</div>
			<div className="mb-5">
				<label className="inline-block w-32 mr-5">Password</label>
				<input className="input" id="password" name="password" type="password" placeholder="Password" />
			</div>
			<button className="btn" type="submit">
				Login
			</button>
		</form>
	)
}

export default Login
