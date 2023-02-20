import random from "random"
import { OPERATORS } from "@/lib/constants/game.constants"
import { ISettings } from "@/lib/interfaces/game.interfaces"

const getNumbers = (operator: string, settings: ISettings) => {
	const { add1, add2, multiply1, multiply2 } = settings

	const returnNormal = (a: number, b: number, ans: number) => {
		return { vars: [a, b], ans: ans }
	}

	const returnReverse = (a: number, b: number, ans: number) => {
		return { vars: [ans, a], ans: b }
	}

	if (operator === OPERATORS.ADD || operator === OPERATORS.SUBTRACT) {
		const a = random.int(Math.min(...add1), Math.max(...add1))
		const b = random.int(Math.min(...add2), Math.max(...add2))
		const ans = a + b

		if (operator === OPERATORS.ADD) return returnNormal(a, b, ans)
		if (operator === OPERATORS.SUBTRACT) return returnReverse(a, b, ans)
	}

	if (operator === OPERATORS.MULTIPLY || operator === OPERATORS.DIVIDE) {
		const a = random.int(Math.min(...multiply1), Math.max(...multiply1))
		const b = random.int(Math.min(...multiply2), Math.max(...multiply2))
		const ans = a * b

		if (operator === OPERATORS.MULTIPLY) return returnNormal(a, b, ans)
		if (operator === OPERATORS.DIVIDE) return returnReverse(a, b, ans)
	}
}

export const getQuestion = (settings: ISettings, mode?: string) => {
	const { isAdd, isSubtract, isMultiply, isDivide } = settings
	let operators: Array<string> = []

	if (isAdd) operators.push(OPERATORS.ADD)
	if (isSubtract) operators.push(OPERATORS.SUBTRACT)
	if (isMultiply) operators.push(OPERATORS.MULTIPLY)
	if (isDivide) operators.push(OPERATORS.DIVIDE)

	const operator = random.choice(operators) as string
	const numbers = getNumbers(operator, settings)

	return { operator: operator, numbers: numbers }
}
