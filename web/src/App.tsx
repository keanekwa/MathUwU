import React, { useState, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Layout from "./components/Layout/Layout"
import Game from "./components/Game/Game"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import api from "./utils/api"

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

const App = () => {
	const [context, setContext] = useState<any>()

	useEffect(() => {
		api.get("/user").then((res) => {
			const user = res?.data
			if (user) setContext({ currentUser: user?.username })
		})
	}, [])

	return (
		<Context.Provider value={[context, setContext]}>
			<RouterProvider router={router}></RouterProvider>
		</Context.Provider>
	)
}

export default App

export const Context = React.createContext<any>(undefined)
