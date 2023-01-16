import React, { ReactNode } from "react"
import Navbar from "./Navbar/Navbar"

interface LayoutProps {
	children: ReactNode
}

const Layout = (props: LayoutProps) => {
	return (
		<div className="h-full overflow-auto bg-gray-700 text-white py-10">
			<div className="container">
				<Navbar />
				<div className="py-14 px-5">{props.children}</div>
			</div>
		</div>
	)
}

export default Layout
