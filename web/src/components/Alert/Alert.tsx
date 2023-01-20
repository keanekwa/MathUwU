import React from "react"

interface AlertProps {
	show: boolean
	message: string
}

const Alert = ({ show, message }: AlertProps) => {
	const defaultClasses =
		"alert alert-warning fixed top-2 left-1/2 -translate-x-1/2 w-auto max-w-sm pr-10 shadow-2xl transition duration-300 z-10 pointer-events-none"
	const showClasses = "opacity-100 translate-y-0"
	const hideClasses = "opacity-0 -translate-y-5"
	let classes = ""
	if (show) classes = defaultClasses + " " + showClasses
	else classes = defaultClasses + " " + hideClasses

	return (
		<div className={classes}>
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<span>{message}</span>
			</div>
		</div>
	)
}

export default Alert
