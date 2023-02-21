import random from "random"
import { GAME_MODES, OPERATORS } from "@/lib/constants/game.constants"
import { ISettings } from "@/lib/interfaces/game.interfaces"
import _ from "lodash"

const getOperator = (settings: ISettings) => {
	const { isAdd, isSubtract, isMultiply, isDivide } = settings

	let operators: Array<string> = []

	if (isAdd) operators.push(OPERATORS.ADD)
	if (isSubtract) operators.push(OPERATORS.SUBTRACT)
	if (isMultiply) operators.push(OPERATORS.MULTIPLY)
	if (isDivide) operators.push(OPERATORS.DIVIDE)

	return random.choice(operators) as string
}

const getInt = (range: [number, number]) => {
	return random.int(Math.min(...range), Math.max(...range))
}

const getDecimal = (range: [number, number], decimalPlaces: number = 2) => {
	return (
		Math.round(
			random.int(Math.min(...range) * Math.pow(10, decimalPlaces), Math.max(...range) * Math.pow(10, decimalPlaces))
		) / Math.pow(10, decimalPlaces)
	)
}

const returnNormal = (a: number, b: number, ans: number) => {
	return { vars: [a, b], ans: ans }
}

const returnReverse = (a: number, b: number, ans: number) => {
	return { vars: [ans, a], ans: b }
}

const getQuestionDefault = (operator: string, settings: ISettings) => {
	const { add1, add2, multiply1, multiply2 } = settings

	if (operator === OPERATORS.ADD || operator === OPERATORS.SUBTRACT) {
		const a = getInt(add1)
		const b = getInt(add2)
		const ans = a + b

		if (operator === OPERATORS.ADD) return { operator: operator, numbers: returnNormal(a, b, ans) }
		if (operator === OPERATORS.SUBTRACT) return { operator: operator, numbers: returnReverse(a, b, ans) }
	}

	if (operator === OPERATORS.MULTIPLY || operator === OPERATORS.DIVIDE) {
		const a = getInt(multiply1)
		const b = getInt(multiply2)
		const ans = a * b

		if (operator === OPERATORS.MULTIPLY) return { operator: operator, numbers: returnNormal(a, b, ans) }
		if (operator === OPERATORS.DIVIDE) return { operator: operator, numbers: returnReverse(a, b, ans) }
	}
}

const getQuestionDecimals = (operator: string, settings: ISettings) => {
	const { add1, add2, multiply1, multiply2, decimalPlaces } = settings

	if (operator === OPERATORS.ADD || operator === OPERATORS.SUBTRACT) {
		const a = getDecimal(add1, decimalPlaces)
		const b = getDecimal(add2, decimalPlaces)
		const ans = a + b
		console.log(a, b, ans)

		if (operator === OPERATORS.ADD) return { operator: operator, numbers: returnNormal(a, b, ans) }
		if (operator === OPERATORS.SUBTRACT) return { operator: operator, numbers: returnReverse(a, b, ans) }
	}

	if (operator === OPERATORS.MULTIPLY || operator === OPERATORS.DIVIDE) {
		const a = getInt(multiply1)
		const b = getDecimal(multiply2, decimalPlaces)
		const ans = a * b
		console.log(a, b, ans)

		if (operator === OPERATORS.MULTIPLY) return { operator: operator, numbers: returnNormal(a, b, ans) }
		if (operator === OPERATORS.DIVIDE) return { operator: operator, numbers: returnReverse(a, b, ans) }
	}
}

const isCorrectDefault = (val: string, ans: number, settings: ISettings) => {
	if (parseInt(val) === ans) return true
	else return false
}

const isCorrectDecimals = (val: string, ans: number, settings: ISettings) => {
	const { decimalPlaces } = settings
	if (parseFloat(val) === parseFloat(ans.toFixed(decimalPlaces))) return true
	else return false
}

const modeToGetQuestionMap: { [key: string]: Function } = {
	default: getQuestionDefault,
	decimals: getQuestionDecimals
	// fractions: getQuestionFraction,
	// eightyInEight: getQuestion80in8
}

const modeToIsCorrectMap: { [key: string]: Function } = {
	default: isCorrectDefault,
	decimals: isCorrectDecimals
	// fractions: isCorrectFractions,
	// eightyInEight: isCorrect80in8
}

export const getQuestion = (mode: string = "default", settings: ISettings) => {
	const operator = getOperator(settings)
	if (mode in modeToGetQuestionMap) return modeToGetQuestionMap[mode](operator, settings)
}

export const isCorrect = (mode: string = "default", val: string, ans: number, settings: ISettings) => {
	if (mode in modeToGetQuestionMap) return modeToIsCorrectMap[mode](val, ans, settings)
}
