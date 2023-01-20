import React from "react"

const Footer = () => {
	return (
		<footer className="footer flex flex-row justify-between p-5 opacity-50">
			<div>
				<p>
					Open source on{" "}
					<a className="link" href="https://github.com/keanekwa/MathUwU" target="_blank" rel="noopener noreferrer">
						GitHub
					</a>
				</p>
			</div>
			<div>
				<p>
					Developed by{" "}
					<a className="link" href="https://github.com/keanekwa" target="_blank" rel="noopener noreferrer">
						Keane Kwa
					</a>
				</p>
			</div>
		</footer>
	)
}

export default Footer
