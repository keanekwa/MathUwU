import { useState } from "react"
import random from "random"

const OPERATORS = {
	ADD: "+",
	SUBTRACT: "-",
	MULTIPLY: "x",
	DIVIDE: "÷"
}

const getNumbers = (operator: string) => {
	const returnNormal = (a: number, b: number, ans: number) => {
		console.log(ans)
		return { vars: [a, b], ans: ans }
	}

	const returnReverse = (a: number, b: number, ans: number) => {
		console.log(b)
		return { vars: [ans, a], ans: b }
	}

	if (operator === OPERATORS.ADD || operator === OPERATORS.SUBTRACT) {
		const a = random.int(2, 100)
		const b = random.int(2, 100)
		const ans = a + b

		if (operator === OPERATORS.ADD) return returnNormal(a, b, ans)
		if (operator === OPERATORS.SUBTRACT) return returnReverse(a, b, ans)
	}

	if (operator === OPERATORS.MULTIPLY || operator === OPERATORS.DIVIDE) {
		const a = random.int(2, 12)
		const b = random.int(2, 100)
		const ans = a * b

		if (operator === OPERATORS.MULTIPLY) return returnNormal(a, b, ans)
		if (operator === OPERATORS.DIVIDE) return returnReverse(a, b, ans)
	}
}

const getQuestion = () => {
	const operator = random.choice([OPERATORS.ADD, OPERATORS.SUBTRACT, OPERATORS.MULTIPLY, OPERATORS.DIVIDE]) as string
	const numbers = getNumbers(operator)

	return { operator: operator, numbers: numbers }
}

const Game = () => {
	const [question, setQuestion] = useState(() => getQuestion())
	const [answer, setAnswer] = useState("")
	const { operator, numbers } = question

	const getNewQuestion = () => {
		setQuestion(getQuestion())
		setAnswer("")
	}

	const checkAnswer = (val: string, ans: number) => {
		setAnswer(val)

		if (parseInt(val) === ans) {
			setTimeout(() => getNewQuestion(), 100)
		}
	}

	return (
		<div>
			{numbers?.vars[0]} {operator} {numbers?.vars[1]} ={" "}
			<input onChange={(e) => checkAnswer(e.target.value, numbers?.ans as number)} value={answer} />
		</div>
	)
}

export default Game
