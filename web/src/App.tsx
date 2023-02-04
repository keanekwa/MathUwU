import React, { useState /*useEffect*/ } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Layout from "./components/Layout/Layout"
import GameSelect from "./components/GameSelect/GameSelect"
import Game from "./components/Game/Game"
// import Register from "./components/Register/Register"
// import Login from "./components/Login/Login"
// import api from "./utils/api"
import Error404 from "./components/Error404/Error404"
import { IAlert } from "./interfaces/Alert"

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
	// {
	// 	path: "/register",
	// 	element: (
	// 		<Layout>
	// 			<Register />
	// 		</Layout>
	// 	)
	// },
	// {
	// 	path: "/login",
	// 	element: (
	// 		<Layout>
	// 			<Login />
	// 		</Layout>
	// 	)
	// },
	{
		path: "*",
		element: (
			<Layout>
				<Error404 message="Page not found." />
			</Layout>
		)
	}
])

const App = () => {
	const [user, setUser] = useState<string | null>(null)
	const [alert, setAlert] = useState<IAlert>({ show: false, message: "" })

	// useEffect(() => {
	// 	api.get("/user").then((res) => {
	// 		const user = res?.data
	// 		if (user) setUser(user?.username)
	// 		else setUser(null)
	// 	})
	// }, [])

	return (
		<UserContext.Provider value={[user, setUser]}>
			<AlertContext.Provider value={[alert, setAlert]}>
				<RouterProvider router={router}></RouterProvider>
			</AlertContext.Provider>
		</UserContext.Provider>
	)
}

export default App

export const UserContext = React.createContext<any>(undefined)
export const AlertContext = React.createContext<any>(undefined)
