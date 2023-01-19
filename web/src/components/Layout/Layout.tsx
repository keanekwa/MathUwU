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
		<div className="h-full overflow-auto bg-slate-50 dark:bg-slate-800">
			<Navbar />
			<Alert show={alert?.show} message={alert?.message} />
			<div className="container">
				<div className="py-14 px-5">{props.children}</div>
			</div>
		</div>
	)
}

export default Layout
