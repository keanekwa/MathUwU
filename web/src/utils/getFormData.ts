import React from "react"

interface ResponseBody {
	[key: string]: string
}

const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
	const formData = new FormData(event.currentTarget as HTMLFormElement)
	const responseBody: ResponseBody = {}
	formData.forEach((value, property: string) => (responseBody[property] = value as string))

	return responseBody
}

export default getFormData
