import axios from "axios"

const api = axios.create({
	baseURL:
		process.env.NEXT_PUBLIC_ENV === "PROD"
			? process.env.NEXT_PUBLIC_API_HOST
			: process.env.NEXT_PUBLIC_API_HOST! + ":" + process.env.NEXT_PUBLIC_API_PORT!.toString(),
	timeout: 1000,
	withCredentials: true
})

export default api
