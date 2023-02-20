import Link from "next/link"
import { useRouter } from "next/router"
import React /*, { useContext }*/ from "react"
// import { AlertContext, UserContext } from "../../../App"
// import api from "../../../utils/api"
import DarkModeSwitcher from "../DarkModeSwitcher/DarkModeSwitcher"

// const handleLogout = async (router: NextRouter, setUser: Function, setAlert: Function) => {
// 	try {
// 		await api.post("/logout")
// 		setUser(null)
// 		router.push("/")
// 	} catch (err: any) {
// 		const errMessage = err?.response?.data?.message
// 		setAlert({ show: true, message: errMessage })
// 	}
// }

const Navbar = () => {
	// const [user, setUser] = useContext(UserContext)
	// const [, setAlert] = useContext(AlertContext)
	// const router = useRouter()
	const router = useRouter()

	return (
		<div className="navbar">
			<div className="flex-1">
				{router?.pathname === "/" ? (
					<button className="btn btn-ghost normal-case text-2xl logo" onClick={() => window.location.reload()}>
						MathUwU
					</button>
				) : (
					<Link href="/">
						<button className="btn btn-ghost normal-case text-2xl logo">MathUwU</button>
					</Link>
				)}
			</div>
			<DarkModeSwitcher />
			{/* {user !== undefined &&
				(user ? (
					<div className="flex-none">
						<div className="dropdown dropdown-end">
							<button className="btn btn-ghost btn-circle avatar" tabIndex={0}>
								<div className="w-10 h-10 leading-10 rounded-full bg-base-300">{user[0].toUpperCase()}</div>
							</button>
							<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
								<li>
									<span>Profile</span>
								</li>
								<li>
									<span onClick={() => handleLogout(router, setUser, setAlert)}>Logout</span>
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
				))} */}
		</div>
	)
}

export default Navbar
