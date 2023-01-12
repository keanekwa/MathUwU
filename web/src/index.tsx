import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Layout from "./components/Layout/Layout"
import Game from "./components/Game/Game"
import Register from "./components/Register/Register"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<Layout>
		<Game />
		<br />
		<br />
		<Register />
	</Layout>
)
