import React from "react"
import { Link } from "react-router-dom"

interface Error404Props {
	message: string
}

const Error404 = ({ message }: Error404Props) => {
	return (
		<div>
			<h2>Error 404</h2>
			<p>
				{message}{" "}
				<Link to="/">
					<span className="link">Return to homepage.</span>
				</Link>
			</p>
		</div>
	)
}

export default Error404
