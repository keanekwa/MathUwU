import React, { useContext, useEffect, useRef, useState } from "react"

import api from "../../lib/utils/api"
import useInterval from "../../lib/utils/useInterval"
import Timer from "./Timer/Timer"
import Score from "./Score/Score"
import CustomSettings from "./CustomSettings/CustomSettings"
import { GAME_MODES } from "../../lib/constants/game.constants"
import Stats from "./Stats/Stats"
import { IQuestionAnswered } from "../../lib/interfaces/game.interfaces"
import { useRouter } from "next/router"
import { UserContext } from "../../lib/contexts/user.context"
import { AlertContext } from "../../lib/contexts/alert.context"
import { getQuestion } from "../../lib/functions/game.function"

const Game = () => {
	const router = useRouter()
	const { isReady, query } = router
	const mode = typeof query?.mode === "string" ? query?.mode : "default"

	useEffect(() => {
		const gameMode = GAME_MODES.find((m) => m.path === mode)
		if (isReady && gameMode === undefined) router.push("/404")
		if (gameMode !== undefined) setSettings(gameMode!.defaultSettings)
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
	const [settings, setSettings] = useState(GAME_MODES[0].defaultSettings)
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

	if (seconds === 0 && !isScoreSaved) {
		api
			.post("/scores", {
				score: score
			})
			.then(() => {
				if (user) {
					api.get("/scores").then((res) => {
						setScoreHistory(res?.data?.response)
					})
				}

				api.get(`/percentile/${score}`).then((res) => {
					setPercentile(res?.data?.response?.percent_rank)
				})
			})

		setIsScoreSaved(true)
	}

	return (
		<>
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
							<CustomSettings mode={mode} settings={settings} setSettings={setSettings} />
							<button className="btn mt-8 btn-wide" onClick={startGame}>
								Restart
							</button>
						</>
					)
				) : (
					<>
						<CustomSettings mode={mode} settings={settings} setSettings={setSettings} />
						<button className="btn mt-8 btn-wide" onClick={startGame}>
							Start
						</button>
					</>
				)}
			</div>
		</>
	)
}

export default Game
