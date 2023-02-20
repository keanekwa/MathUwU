import React, { useContext } from "react"
import api from "../../lib/utils/api"
import bcrypt from "bcryptjs-react"
import getFormData from "../../lib/utils/getFormData"
import { AlertContext } from "../../pages/_app"
import { NextRouter, useRouter } from "next/router"

const handleRegister = async (event: React.FormEvent<HTMLFormElement>, router: NextRouter, setAlert: Function) => {
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

		router.push("/")
	} catch (err: any) {
		const errMessage = err?.response?.data?.message
		setAlert({ show: true, message: errMessage })
	}
}

const Register = () => {
	const [, setAlert] = useContext(AlertContext)
	const router = useRouter()

	return (
		<div className="flex flex-column justify-center">
			<form onSubmit={(event) => handleRegister(event, router, setAlert)}>
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
