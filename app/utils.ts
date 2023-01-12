const HTTP_STATUS = {
	SUCCESS: 200,
	ERROR_BAD_REQUEST: 400,
	ERROR_VALIDATION: 422
}

const sendSuccess = (res: any, message: string, response: any) => {
	res.status(HTTP_STATUS.SUCCESS).json({ message: message, response: response })
}

const sendBadRequestError = (res: any, message: string) => {
	res.status(HTTP_STATUS.ERROR_BAD_REQUEST).send({ message: message })
}

const sendValidationError = (res: any, message: string) => {
	res.status(HTTP_STATUS.ERROR_VALIDATION).send({ message: message })
}

module.exports = { sendSuccess, sendBadRequestError, sendValidationError }
