import axios from "axios"

const api = axios.create({
	baseURL: process.env.REACT_APP_API_HOST! + ":" + process.env.REACT_APP_API_PORT!.toString(),
	timeout: 1000,
	withCredentials: true
})

export default api
