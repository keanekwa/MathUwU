import React, { useContext } from "react"
import { Link, NavigateFunction, useNavigate, useLocation } from "react-router-dom"
import { Context } from "../../../App"
import api from "../../../utils/api"

const handleLogout = async (navigate: NavigateFunction, setContext: Function) => {
	try {
		await api.post("/logout")
		setContext({ currentUser: null })
		navigate("/")
	} catch (err: any) {
		const errMessage = err?.response?.data?.message
		alert(errMessage)
	}
}

const Navbar = () => {
	const [context, setContext] = useContext(Context)
	const navigate = useNavigate()
	const location = useLocation()

	return (
		<div className="navbar bg-gray-500 rounded-lg shadow-lg">
			<div className="flex-1">
				{location?.pathname === "/" ? (
					<a onClick={() => window.location.reload()} className="btn btn-ghost normal-case text-xl">
						MathUwU
					</a>
				) : (
					<Link to="/">
						<button className="btn btn-ghost normal-case text-xl">MathUwU</button>
					</Link>
				)}
			</div>
			{context?.currentUser !== undefined &&
				(context?.currentUser ? (
					<div className="flex-none">
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div className="w-10 h-10 leading-10 rounded-full bg-gray-400">
									{context?.currentUser[0].toUpperCase()}
								</div>
							</label>
							<ul
								tabIndex={0}
								className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-500 rounded-box w-52">
								<li>
									<a>Profile</a>
								</li>
								<li>
									<a onClick={() => handleLogout(navigate, setContext)}>Logout</a>
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
