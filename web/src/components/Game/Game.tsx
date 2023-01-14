import React, { useState } from "react"
import random from "random"
import Timer from "./Timer/Timer"
import Score from "./Score/Score"
import useInterval from "../../utils/useInterval"

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
	const [score, setScore] = useState(0)
	const [seconds, setSeconds] = useState(120)

	const getNewQuestion = () => {
		setQuestion(getQuestion())
		setAnswer("")
	}

	const checkAnswer = (val: string, ans: number) => {
		setAnswer(val)

		if (parseInt(val) === ans) {
			setScore(score + 1)
			setTimeout(() => getNewQuestion(), 100)
		}
	}

	useInterval(() => setSeconds(seconds - 1), 1000)

	return (
		<div>
			{seconds > 0 ? (
				<>
					<Timer seconds={seconds} />
					<Score score={score} />
					{question?.numbers?.vars[0]} {question?.operator} {question?.numbers?.vars[1]} ={" "}
					<input
						autoFocus
						onChange={(e) => checkAnswer(e.target.value, question?.numbers?.ans as number)}
						value={answer}
					/>
				</>
			) : (
				<>
					Time's up!
					<Score score={score} />
				</>
			)}
		</div>
	)
}

export default Game
