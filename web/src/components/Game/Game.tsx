import React, { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { AlertContext, UserContext } from "../../App"
import api from "./../../utils/api"
import random from "random"
import useInterval from "../../utils/useInterval"
import Error404 from "./../Error404/Error404"
import Timer from "./Timer/Timer"
import Score from "./Score/Score"
import CustomSettings from "./CustomSettings/CustomSettings"
import { GAME_MODES, OPERATORS } from "./../../constants"
import Stats from "./Stats/Stats"
import { IQuestionAnswered, ISettings } from "../../interfaces/Game"

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

const getQuestion = (settings: ISettings) => {
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

const defaultSettings: ISettings = {
	isAdd: true,
	isSubtract: true,
	isDivide: true,
	isMultiply: true,
	add1: [2, 100],
	add2: [2, 100],
	multiply1: [2, 12],
	multiply2: [2, 100],
	seconds: 120
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

	const [user] = useContext(UserContext)
	const [, setAlert] = useContext(AlertContext)
	const [start, setStart] = useState(false)
	const [answer, setAnswer] = useState("")
	const [score, setScore] = useState(0)
	const [seconds, setSeconds] = useState(120)
	const [startSeconds, setStartSeconds] = useState(120)
	const [isScoreSaved, setIsScoreSaved] = useState(false)
	const [scoreHistory, setScoreHistory] = useState([])
	const [settings, setSettings] = useState(defaultSettings)
	const [question, setQuestion] = useState(() => getQuestion(settings))
	const [percentile, setPercentile] = useState(0)
	const [questionStartTime, setQuestionStartTime] = useState(0)
	const [questionsAnswered, setQuestionsAnswered] = useState<IQuestionAnswered[]>([])
	const inputRef = useRef<HTMLInputElement>(null)

	const getNewQuestion = () => {
		setQuestion(getQuestion(settings))
		setQuestionStartTime(performance.now())
		setAnswer("")
	}

	const checkAnswer = (val: string, ans: number) => {
		setAnswer(val)

		if (parseInt(val) === ans) {
			const questionEndTime = performance.now()
			const lastQuestion = {
				...question,
				duration: questionEndTime - questionStartTime
			}

			setQuestionsAnswered([...questionsAnswered, lastQuestion as IQuestionAnswered])
			setScore(score + 1)
			setTimeout(() => getNewQuestion(), 100)
		}
	}

	const startGame = () => {
		const { isAdd, isSubtract, isMultiply, isDivide, add1, add2, multiply1, multiply2, seconds } = settings
		if ((isAdd || isSubtract) && (add1.includes(NaN) || add2.includes(NaN))) {
			setAlert({ show: true, message: "Enter a numeric range for addition." })
			return
		}
		if ((isMultiply || isDivide) && (multiply1.includes(NaN) || multiply2.includes(NaN))) {
			setAlert({ show: true, message: "Enter a numeric range for multiplication." })
			return
		}
		if (Number.isNaN(seconds)) {
			setAlert({ show: true, message: "Enter a game duration." })
			return
		}

		setQuestionsAnswered([])
		getNewQuestion()
		setScore(0)
		setIsScoreSaved(false)
		setStartSeconds(settings.seconds)
		setSeconds(settings.seconds)
		setStart(true)
		inputRef.current?.focus()
	}

	useInterval(() => setSeconds(seconds - 1), 1000)

	if (seconds === 0 && !isScoreSaved && user) {
		api
			.post("/scores", {
				score: score
			})
			.then(() => {
				api.get("/scores").then((res) => {
					setScoreHistory(res?.data?.response)
				})

				api.get(`/percentile/${score}`).then((res) => {
					setPercentile(res?.data?.response?.percent_rank)
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
										className="input"
										type="number"
										autoFocus
										ref={inputRef}
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
								<h2 className="mb-5">Time's up!</h2>
								<Stats
									score={score}
									seconds={startSeconds}
									percentile={percentile}
									questionsAnswered={questionsAnswered}
									scoreHistory={scoreHistory}
								/>
								<div className="my-8 divider"></div>
								<CustomSettings settings={settings} setSettings={setSettings} />
								<button className="btn mt-8 btn-wide" onClick={startGame}>
									Restart
								</button>
							</>
						)
					) : (
						<>
							<CustomSettings settings={settings} setSettings={setSettings} />
							<button className="btn mt-8 btn-wide" onClick={startGame}>
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
