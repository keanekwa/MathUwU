import React from "react"
import { IResponseBody } from "@/lib/interfaces/utils.interfaces"

const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
	const formData = new FormData(event.currentTarget as HTMLFormElement)
	const responseBody: IResponseBody = {}
	formData.forEach((value, property: string) => (responseBody[property] = value as string))

	return responseBody
}

export default getFormData
