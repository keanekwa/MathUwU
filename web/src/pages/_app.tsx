import "./../styles/globals.css"
import type { AppProps } from "next/app"
import { createContext, useState } from "react"
import { IAlert } from "../interfaces/Alert"

export default function App({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState<string | null>(null)
	const [alert, setAlert] = useState<IAlert>({ show: false, message: "" })

	return (
		<UserContext.Provider value={[user, setUser]}>
			<AlertContext.Provider value={[alert, setAlert]}>
				<Component {...pageProps} />
			</AlertContext.Provider>
		</UserContext.Provider>
	)
}

export const UserContext = createContext<any>(undefined)
export const AlertContext = createContext<any>(undefined)
