import React, { ReactNode, useContext } from "react"
import { AlertContext } from "../../App"
import Alert from "../Alert/Alert"
import Navbar from "./Navbar/Navbar"

interface LayoutProps {
	children: ReactNode
}

const Layout = (props: LayoutProps) => {
	const [alert, setAlert] = useContext(AlertContext)

	if (alert.show) {
		setTimeout(() => setAlert({ ...alert, show: false }), 5000)
		setTimeout(() => setAlert({ show: false, message: "" }), 5300)
	}

	return (
		<div className="h-full overflow-auto">
			<Navbar />
			<Alert show={alert?.show} message={alert?.message} />
			<div className="container pt-14 pb-24">{props.children}</div>
		</div>
	)
}

export default Layout
