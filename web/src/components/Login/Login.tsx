import React, { useContext } from "react"
import api from "@/lib/utils/api"
import getFormData from "@/lib/utils/getFormData"
import { AlertContext, UserContext } from "@/pages/_app"
import { NextRouter, useRouter } from "next/router"

const handleLogin = async (
	event: React.FormEvent<HTMLFormElement>,
	router: NextRouter,
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

		router.push("/")
	} catch (err: any) {
		const errMessage = err?.response?.data?.message
		setAlert({ show: true, message: errMessage })
	}
}

const Login = () => {
	const [, setUser] = useContext(UserContext)
	const [, setAlert] = useContext(AlertContext)
	const router = useRouter()

	return (
		<div className="flex flex-column justify-center">
			<form onSubmit={(event) => handleLogin(event, router, setUser, setAlert)}>
				<div className="mb-2">
					<label className="inline-block w-24 mr-5" htmlFor="username">
						Username
					</label>
					<input className="input" id="username" name="username" placeholder="Username" />
				</div>
				<div className="mb-5">
					<label className="inline-block w-24 mr-5">Password</label>
					<input className="input" id="password" name="password" type="password" placeholder="Password" />
				</div>
				<button className="btn" type="submit">
					Login
				</button>
			</form>
		</div>
	)
}

export default Login
