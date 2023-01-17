import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
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
import Alert from "../Alert/Alert"

const getNumbers = (operator: string, settings: Settings) => {
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
	add1: [2, 100],
	add2: [2, 100],
	multiply1: [2, 12],
	multiply2: [2, 12],
	seconds: 120
}

export interface Settings {
	isAdd: boolean
	isSubtract: boolean
	isDivide: boolean
	isMultiply: boolean
	add1: [number, number]
	add2: [number, number]
	multiply1: [number, number]
	multiply2: [number, number]
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
	const [showAlert, setShowAlert] = useState(false)
	const [alertMessage, setAlertMessage] = useState("")

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
		const { isAdd, isSubtract, isMultiply, isDivide, add1, add2, multiply1, multiply2, seconds } = settings
		if ((isAdd || isSubtract) && (add1.includes(NaN) || add2.includes(NaN))) {
			setShowAlert(true)
			setAlertMessage("Enter a numeric range for addition.")
			return
		}
		if ((isMultiply || isDivide) && (multiply1.includes(NaN) || multiply2.includes(NaN))) {
			setShowAlert(true)
			setAlertMessage("Enter a numeric range for multiplication.")
			return
		}
		if (Number.isNaN(seconds)) {
			setShowAlert(true)
			setAlertMessage("Enter a game duration.")
			setTimeout(() => setShowAlert(false), 5000)
			setTimeout(() => setAlertMessage(""), 5300)
			return
		}

		getNewQuestion()
		setScore(0)
		setIsScoreSaved(false)
		setSeconds(settings.seconds)
		setStart(true)
	}

	useInterval(() => setSeconds(seconds - 1), 1000)

	if (seconds === 0 && !isScoreSaved && context?.currentUser) {
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
			<Alert show={showAlert} message={alertMessage} />
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
										className="input"
										autoFocus
										onChange={(e) => checkAnswer(e.target.value, question?.numbers?.ans as number)}
										value={answer}
									/>
								</div>
								<button className="btn mt-8" onClick={startGame}>
									Restart
								</button>
							</>
						) : (
							<>
								<div className="mb-5">
									<h6>Time's up!</h6>
									<Score score={score} />
								</div>
								{context?.currentUser ? (
									<ScoreHistory scoreHistory={scoreHistory} />
								) : (
									<Link to="/login">
										<button className="link">Login to save scores.</button>
									</Link>
								)}
								<div className="divider"></div>
								<CustomSettings settings={settings} setSettings={setSettings} />
								<button className="btn mt-8" onClick={startGame}>
									Restart
								</button>
							</>
						)
					) : (
						<>
							<CustomSettings settings={settings} setSettings={setSettings} />
							<button className="btn mt-8 btn-lg btn-wide" onClick={startGame}>
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
