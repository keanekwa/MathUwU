import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../../App"
import api from "./../../utils/api"
import random from "random"
import useInterval from "../../utils/useInterval"
import Error404 from "./../Error404/Error404"
import Timer from "./Timer/Timer"
import Score from "./Score/Score"
import ScoreHistory from "./ScoreHistory/ScoreHistory"
import CustomSettings from "./CustomSettings/CustomSettings"
import { GAME_MODES, OPERATORS } from "./../../constants"

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
	multiplyHigh2: 100,
	seconds: 120
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
	seconds: number
}

const Game = () => {
	const { mode } = useParams()
	const [is404, setIs404] = useState(false)

	useEffect(() => {
		const modePaths = Object.values(GAME_MODES).map((m) => m.path)
		if (mode !== undefined && !modePaths.includes("/" + mode)) {
			setIs404(true)
		}
	}, [mode])

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
		console.log(settings)
		getNewQuestion()
		setScore(0)
		setIsScoreSaved(false)
		setSeconds(settings.seconds)
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
		<>
			{is404 ? (
				<Error404 message="Game not found." />
			) : (
				<div className="text-center flex flex-col justify-center items-center">
					{start ? (
						seconds > 0 ? (
							<>
								<Timer seconds={seconds} />
								<Score score={score} />
								<div className="flex justify-center items-center my-10">
									<span className="text-xl mr-5">
										{question?.numbers?.vars[0]} {question?.operator} {question?.numbers?.vars[1]} =
									</span>
									<input
										autoFocus
										onChange={(e) => checkAnswer(e.target.value, question?.numbers?.ans as number)}
										value={answer}
									/>
								</div>
								<button className="mt-8" onClick={startGame}>
									Restart
								</button>
							</>
						) : (
							<>
								<div className="mb-5">
									<h6>Time's up!</h6>
									<Score score={score} />
								</div>
								<CustomSettings settings={settings} setSettings={setSettings} />
								<button className="mt-8" onClick={startGame}>
									Restart
								</button>
								<ScoreHistory scoreHistory={scoreHistory} />
							</>
						)
					) : (
						<>
							<CustomSettings settings={settings} setSettings={setSettings} />
							<button className="mt-8 btn-lg btn-wide" onClick={startGame}>
								Start
							</button>
						</>
					)}
				</div>
			)}
		</>
	)
}

export default Game
