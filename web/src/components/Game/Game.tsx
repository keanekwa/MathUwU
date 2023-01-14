import React, { useContext, useState } from "react"
import { Context } from "../../App"
import api from "./../../utils/api"
import random from "random"
import useInterval from "../../utils/useInterval"
import Timer from "./Timer/Timer"
import Score from "./Score/Score"
import ScoreHistory from "./ScoreHistory/ScoreHistory"
import CustomSettings from "./CustomSettings/CustomSettings"

const OPERATORS = {
	ADD: "+",
	SUBTRACT: "-",
	MULTIPLY: "x",
	DIVIDE: "÷"
}

const getNumbers = (operator: string, settings: Settings) => {
	const { addLow1, addHigh1, addLow2, addHigh2, multiplyLow1, multiplyHigh1, multiplyLow2, multiplyHigh2 } = settings

	const returnNormal = (a: number, b: number, ans: number) => {
		console.log(ans)
		return { vars: [a, b], ans: ans }
	}

	const returnReverse = (a: number, b: number, ans: number) => {
		console.log(b)
		return { vars: [ans, a], ans: b }
	}

	if (operator === OPERATORS.ADD || operator === OPERATORS.SUBTRACT) {
		const a = random.int(addLow1, addHigh1)
		const b = random.int(addLow2, addHigh2)
		const ans = a + b

		if (operator === OPERATORS.ADD) return returnNormal(a, b, ans)
		if (operator === OPERATORS.SUBTRACT) return returnReverse(a, b, ans)
	}

	if (operator === OPERATORS.MULTIPLY || operator === OPERATORS.DIVIDE) {
		const a = random.int(multiplyLow1, multiplyHigh1)
		const b = random.int(multiplyLow2, multiplyHigh2)
		const ans = a * b

		if (operator === OPERATORS.MULTIPLY) return returnNormal(a, b, ans)
		if (operator === OPERATORS.DIVIDE) return returnReverse(a, b, ans)
	}
}

const getQuestion = (settings: Settings) => {
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

const defaultSettings: Settings = {
	isAdd: true,
	isSubtract: true,
	isDivide: true,
	isMultiply: true,
	addLow1: 2,
	addHigh1: 100,
	addLow2: 2,
	addHigh2: 100,
	multiplyLow1: 2,
	multiplyHigh1: 12,
	multiplyLow2: 2,
	multiplyHigh2: 100
}

export interface Settings {
	isAdd: boolean
	isSubtract: boolean
	isDivide: boolean
	isMultiply: boolean
	addLow1: number
	addHigh1: number
	addLow2: number
	addHigh2: number
	multiplyLow1: number
	multiplyHigh1: number
	multiplyLow2: number
	multiplyHigh2: number
}

const Game = () => {
	const [context] = useContext(Context)
	const [start, setStart] = useState(false)
	const [answer, setAnswer] = useState("")
	const [score, setScore] = useState(0)
	const [seconds, setSeconds] = useState(120)
	const [isScoreSaved, setIsScoreSaved] = useState(false)
	const [scoreHistory, setScoreHistory] = useState([])
	const [settings, setSettings] = useState(defaultSettings)
	const [question, setQuestion] = useState(() => getQuestion(settings))

	const getNewQuestion = () => {
		setQuestion(getQuestion(settings))
		setAnswer("")
	}

	const checkAnswer = (val: string, ans: number) => {
		setAnswer(val)

		if (parseInt(val) === ans) {
			setScore(score + 1)
			setTimeout(() => getNewQuestion(), 100)
		}
	}

	const startGame = () => {
		getNewQuestion()
		setScore(0)
		setIsScoreSaved(false)
		setSeconds(10)
		setStart(true)
	}

	useInterval(() => setSeconds(seconds - 1), 1000)

	if (seconds === 0 && !isScoreSaved) {
		api
			.post("/scores", {
				username: context?.currentUser,
				score: score
			})
			.then(() => {
				api.get("/scores").then((res) => {
					setScoreHistory(res?.data?.response)
				})
			})

		setIsScoreSaved(true)
	}

	return (
		<div>
			{start ? (
				seconds > 0 ? (
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
						<CustomSettings settings={settings} setSettings={setSettings} />
						<br />
						<button onClick={startGame}>Restart</button>
						<ScoreHistory scoreHistory={scoreHistory} />
					</>
				)
			) : (
				<>
					<CustomSettings settings={settings} setSettings={setSettings} />
					<br />
					<button onClick={startGame}>Start</button>
				</>
			)}
		</div>
	)
}

export default Game
