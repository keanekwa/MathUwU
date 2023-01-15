import React, { useState, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Layout from "./components/Layout/Layout"
import GameSelect from "./components/GameSelect/GameSelect"
import Game from "./components/Game/Game"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import api from "./utils/api"
import Error404 from "./components/Error404/Error404"

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Layout>
				<GameSelect />
			</Layout>
		)
	},
	{
		path: "/game/:mode",
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
	},
	{
		path: "*",
		element: (
			<Layout>
				<Error404 message="Page not found." />
			</Layout>
		)
	}
])

interface ContextType {
	currentUser: string | undefined | null //undefined means /user API has NOT been called. null means user is logged out
}

const App = () => {
	const [context, setContext] = useState<ContextType>({ currentUser: undefined })

	useEffect(() => {
		api.get("/user").then((res) => {
			const user = res?.data
			if (user) setContext({ currentUser: user?.username })
			else setContext({ currentUser: null })
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
