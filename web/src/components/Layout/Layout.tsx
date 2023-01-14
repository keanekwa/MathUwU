import React, { ReactNode, useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../../App"

interface LayoutProps {
	children: ReactNode
}

const Layout = (props: LayoutProps) => {
	const [context] = useContext(Context)

	return (
		<div>
			<nav>
				<Link to="/">Home</Link>&nbsp;
				<Link to="/login">Login</Link>&nbsp;
				<Link to="/register">Register</Link>
			</nav>
			<br />
			{context?.user && <>Logged in as: {context?.user?.username}</>}
			<br />
			<br />
			<div>{props.children}</div>
		</div>
	)
}

export default Layout
