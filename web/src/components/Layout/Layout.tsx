import React, { ReactNode } from "react"
import { Link } from "react-router-dom"

interface LayoutProps {
	children: ReactNode
}

const Layout = (props: LayoutProps) => {
	return (
		<div>
			<nav>
				<Link to="/">Home</Link>&nbsp;
				<Link to="/login">Login</Link>&nbsp;
				<Link to="/register">Register</Link>
			</nav>
			<br />
			<div>{props.children}</div>
		</div>
	)
}

export default Layout
