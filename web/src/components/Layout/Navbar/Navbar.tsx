import React, { useContext } from "react"
import { Link, NavigateFunction, useNavigate, useLocation } from "react-router-dom"
import { AlertContext, UserContext } from "../../../App"
import api from "../../../utils/api"
import DarkModeSwitcher from "../DarkModeSwitcher/DarkModeSwitcher"

const handleLogout = async (navigate: NavigateFunction, setUser: Function, setAlert: Function) => {
	try {
		await api.post("/logout")
		setUser(null)
		navigate("/")
	} catch (err: any) {
		const errMessage = err?.response?.data?.message
		setAlert({ show: true, message: errMessage })
	}
}

const Navbar = () => {
	const [user, setUser] = useContext(UserContext)
	const [, setAlert] = useContext(AlertContext)
	const navigate = useNavigate()
	const location = useLocation()

	return (
		<div className="navbar">
			<div className="flex-1">
				{location?.pathname === "/" ? (
					<button className="btn btn-ghost normal-case text-xl" onClick={() => window.location.reload()}>
						MathUwU
					</button>
				) : (
					<Link to="/">
						<button className="btn btn-ghost normal-case text-xl">MathUwU</button>
					</Link>
				)}
			</div>
			<div className="pr-2">
				<DarkModeSwitcher />
			</div>
			{user !== undefined &&
				(user ? (
					<div className="flex-none">
						<div className="dropdown dropdown-end">
							<button className="btn btn-ghost btn-circle avatar" tabIndex={0}>
								<div className="w-10 h-10 leading-10 rounded-full bg-slate-300 dark:bg-slate-700">
									{user[0].toUpperCase()}
								</div>
							</button>
							<ul
								tabIndex={0}
								className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-300 dark:bg-slate-700 rounded-box w-52">
								<li>
									<span>Profile</span>
								</li>
								<li>
									<span onClick={() => handleLogout(navigate, setUser, setAlert)}>Logout</span>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<>
						<Link to="/login">
							<button className="btn btn-ghost normal-case">Login</button>
						</Link>
						<Link to="/register">
							<button className="btn btn-ghost normal-case">Register</button>
						</Link>
					</>
				))}
		</div>
	)
}

export default Navbar
