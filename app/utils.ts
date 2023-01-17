const HTTP_STATUS = {
	SUCCESS: 200,
	ERROR_BAD_REQUEST: 400,
	ERROR_UNAUTHORIZED: 401,
	ERROR_VALIDATION: 422
}

const sendSuccess = (res: any, message: string, response: any) => {
	res.status(HTTP_STATUS.SUCCESS).json({ message: message, response: response })
}

const sendBadRequestError = (res: any, message: string) => {
	res.status(HTTP_STATUS.ERROR_BAD_REQUEST).send({ message: message })
}

const sendUnauthorizedError = (res: any, message: string) => {
	res.status(HTTP_STATUS.ERROR_UNAUTHORIZED).send({ message: message })
}

const sendValidationError = (res: any, message: string) => {
	res.status(HTTP_STATUS.ERROR_VALIDATION).send({ message: message })
}

const checkUndefinedOrNull = (arr: Array<any>) => {
	return arr.includes(null) || arr.includes(undefined)
}

module.exports = { sendSuccess, sendBadRequestError, sendUnauthorizedError, sendValidationError, checkUndefinedOrNull }
