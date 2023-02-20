import Head from "next/head"
import React, { ReactNode, useContext } from "react"
import { AlertContext } from "../../lib/contexts/alert.context"
import Alert from "../Alert/Alert"
import Footer from "./Footer/Footer"
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
		<>
			<Head>
				<title>MathUwU</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<div className="flex flex-col min-h-screen justify-between">
				<Navbar />
				<Alert show={alert?.show} message={alert?.message} />
				<div className="container pt-14 pb-24">{props.children}</div>
				<Footer />
			</div>
		</>
	)
}

export default Layout
