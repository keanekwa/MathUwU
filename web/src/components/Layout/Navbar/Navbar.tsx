import React, { useContext } from "react"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { Context } from "../../../App"
import api from "../../../utils/api"

const handleLogout = async (navigate: NavigateFunction) => {
	try {
		await api.post("/logout")
		navigate("/")
	} catch (err: any) {
		const errMessage = err?.response?.data?.message
		alert(errMessage)
	}
}

const Navbar = () => {
	const [context, setContext] = useContext(Context)
	const navigate = useNavigate()

	return (
		<div className="navbar bg-gray-500 rounded-lg shadow-lg">
			<div className="flex-1">
				<Link to="/">
					<a className="btn btn-ghost normal-case text-xl">MathUwU</a>
				</Link>
			</div>
			{context?.currentUser ? (
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img src="https://placeimg.com/80/80/people" />
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-500 rounded-box w-52">
							<li>
								<a>Profile</a>
							</li>
							<li>
								<a onClick={() => handleLogout(navigate)}>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			) : (
				<>
					<Link to="/login">
						<a className="btn btn-ghost normal-case">Login</a>
					</Link>
					<Link to="/register">
						<a className="btn btn-ghost normal-case">Register</a>
					</Link>
				</>
			)}
		</div>
	)
}

export default Navbar
