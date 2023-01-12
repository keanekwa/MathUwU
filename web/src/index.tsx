import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Layout from "./components/Layout/Layout"
import Game from "./components/Game/Game"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Layout>
				<Game />
			</Layout>
		)
	},
	{
		path: "/register",
		element: (
			<Layout>
				<Register />
			</Layout>
		)
	},
	{
		path: "/login",
		element: (
			<Layout>
				<Login />
			</Layout>
		)
	}
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(<RouterProvider router={router}></RouterProvider>)
