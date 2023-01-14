import React, { ReactNode, useContext } from "react"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { Context } from "../../App"
import api from "../../utils/api"

interface LayoutProps {
	children: ReactNode
}

const handleLogout = async (navigate: NavigateFunction) => {
	try {
		await api.post("/logout")
		navigate("/")
	} catch (err: any) {
		const errMessage = err?.response?.data?.message
		alert(errMessage)
	}
}

const Layout = (props: LayoutProps) => {
	const navigate = useNavigate()
	const [context] = useContext(Context)

	return (
		<div>
			<h1>Math UwU</h1>
			<h1 className="text-3xl font-bold underline mb-5">Hello world!</h1>
			<nav>
				<Link to="/">Home</Link>&nbsp;
				{context?.currentUser ? (
					<>
						<a href="" onClick={() => handleLogout(navigate)}>
							Logout
						</a>
						&nbsp;
					</>
				) : (
					<>
						<Link to="/login">Login</Link>&nbsp;
						<Link to="/register">Register</Link>
					</>
				)}
			</nav>
			<br />
			{context?.currentUser && <>Logged in as: {context?.currentUser}</>}
			<br />
			<br />
			<div>{props.children}</div>
		</div>
	)
}

export default Layout
