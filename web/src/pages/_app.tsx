import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useState } from "react"
import { IAlert } from "@/lib/interfaces/alert.interfaces"
import UserContext from "@/lib/contexts/user.context"
import AlertContext from "@/lib/contexts/alert.context"
import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState<string | null>(null)
	const [alert, setAlert] = useState<IAlert>({ show: false, message: "" })

	return (
		<UserContext.Provider value={[user, setUser]}>
			<AlertContext.Provider value={[alert, setAlert]}>
				<Component {...pageProps} />
				<Analytics />
			</AlertContext.Provider>
		</UserContext.Provider>
	)
}
