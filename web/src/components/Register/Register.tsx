import React, { useContext } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import api from "./../../utils/api"
import bcrypt from "bcryptjs-react"
import getFormData from "./../../utils/getFormData"
import { AlertContext } from "../../App"

const handleRegister = async (
	event: React.FormEvent<HTMLFormElement>,
	navigate: NavigateFunction,
	setAlert: Function
) => {
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
		setAlert({ show: true, message: errMessage })
	}
}

const Register = () => {
	const [, setAlert] = useContext(AlertContext)
	const navigate = useNavigate()

	return (
		<div className="flex flex-column justify-center">
			<form onSubmit={(event) => handleRegister(event, navigate, setAlert)}>
				<div className="mb-2">
					<label className="inline-block w-32 mr-5" htmlFor="username">
						Username{" "}
					</label>
					<input className="input" id="username" name="username" placeholder="Username" />
				</div>
				<div className="mb-2">
					<label className="inline-block w-32 mr-5" htmlFor="email">
						Email{" "}
					</label>
					<input className="input" id="email" name="email" type="email" placeholder="Email" />
				</div>
				<div className="mb-2">
					<label className="inline-block w-32 mr-5" htmlFor="password">
						Password{" "}
					</label>
					<input className="input" id="password" name="password" type="password" placeholder="Password" />
				</div>
				<div className="mb-5">
					<label className="inline-block w-32 mr-5" htmlFor="password2">
						Repeat Password{" "}
					</label>
					<input className="input" id="password2" name="password2" type="password" placeholder="Repeat Password" />
				</div>
				<button className="btn" type="submit">
					Register
				</button>
			</form>
		</div>
	)
}

export default Register
