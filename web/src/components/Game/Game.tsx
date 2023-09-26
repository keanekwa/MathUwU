import React, { useContext, useEffect, useRef, useState } from "react"
import _ from "lodash"
import api from "@/lib/utils/api"
import useInterval from "@/lib/utils/useInterval"
import Timer from "./Timer/Timer"
import Score from "./Score/Score"
import CustomSettings from "./CustomSettings/CustomSettings"
import { GAME_MODES } from "@/lib/constants/game.constants"
import Stats from "./Stats/Stats"
import { IQuestionAnswered } from "@/lib/interfaces/game.interfaces"
import { useRouter } from "next/router"
import UserContext from "@/lib/contexts/user.context"
import AlertContext from "@/lib/contexts/alert.context"
import { getQuestion, isCorrect } from "@/lib/functions/game.function"

const Game = () => {
	const router = useRouter()
	const { isReady, query } = router
	const [user] = useContext(UserContext)
	const [, setAlert] = useContext(AlertContext)
	const [gameMode, setGameMode] = useState(GAME_MODES[0])
	const [start, setStart] = useState(false)
	const [answer, setAnswer] = useState("")
	const [score, setScore] = useState(0)
	const [seconds, setSeconds] = useState(120)
	const [startSeconds, setStartSeconds] = useState(120)
	const [isScoreSaved, setIsScoreSaved] = useState(false)
	const [scoreHistory, setScoreHistory] = useState([])
	const [settings, setSettings] = useState(GAME_MODES[0].defaultSettings)
	const [isDefaultSettings, setIsDefaultSettings] = useState(true)
	const [question, setQuestion] = useState(() => getQuestion(gameMode.path, settings))
	const [percentile, setPercentile] = useState(0)
	const [questionStartTime, setQuestionStartTime] = useState(0)
	const [questionsAnswered, setQuestionsAnswered] = useState<IQuestionAnswered[]>([])
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const mode = typeof query?.mode === "string" ? query?.mode : "default"
		const findGameMode = GAME_MODES.find((m) => m.path === mode)
		if (isReady && (!findGameMode || findGameMode?.disabled === true)) {
			router.push("/404")
		} else if (findGameMode !== undefined) {
			setGameMode(findGameMode)
			setSettings(findGameMode.defaultSettings)
		}
	}, [isReady, query])

	useEffect(() => {
		if (seconds === 0 && !isScoreSaved) {
			setIsScoreSaved(true)

			if (isDefaultSettings) {
				api
					.post("/scores", {
						score: score,
						mode: gameMode.path
					})
					.then(() => {
						if (user) {
							api.get("/scores", { params: { mode: gameMode.path } }).then((res) => {
								setScoreHistory(res?.data?.response)
							})
						}

						api.get(`/percentile`, { params: { score: score, mode: gameMode.path } }).then((res) => {
							setPercentile(res?.data?.response?.percent_rank)
						})
					})
			}
		}
	}, [seconds, isScoreSaved])

	const getNewQuestion = () => {
		setQuestion(getQuestion(gameMode.path, settings))
		setQuestionStartTime(performance.now())
		setAnswer("")
	}

	const checkAnswer = (val: string, ans: number) => {
		setAnswer(val)

		if (isCorrect(gameMode.path, val, ans, settings)) {
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
		if (seconds < 0) {
			setAlert({ show: true, message: "Game duration cannot be negative." })
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
		setIsDefaultSettings(_.isEqual(settings, gameMode.defaultSettings))
		inputRef.current?.focus()
	}

	useInterval(() => setSeconds(seconds - 1), 1000)

	return (
		<>
			{isReady && (
				<div className="text-center flex flex-col justify-center items-center">
					{start ? (
						seconds > 0 ? (
							<>
								<Timer seconds={seconds} />
								<Score score={score} />
								<div className="flex justify-center items-center my-10">
									<span className="math text-xl lg:text-2xl mr-5">
										{question?.numbers?.vars[0] % 1 !== 0
											? question?.numbers?.vars[0].toFixed(settings.decimalPlaces)
											: question?.numbers?.vars[0]}{" "}
										{question?.operator}{" "}
										{question?.numbers?.vars[1] % 1 !== 0
											? question?.numbers?.vars[1].toFixed(settings.decimalPlaces)
											: question?.numbers?.vars[1]}{" "}
										=
									</span>
									<input
										className="input w-28 sm:w-auto"
										type="number"
										inputMode="decimal"
										autoFocus
										ref={inputRef}
										onChange={(e) => checkAnswer(e.target.value, question?.numbers?.ans as number)}
										value={answer}
										onBlur={() => inputRef.current?.focus()}
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
									isDefaultSettings={isDefaultSettings}
								/>
								<div className="my-8 divider"></div>
								<CustomSettings mode={gameMode.path} settings={settings} setSettings={setSettings} />
								<button className="btn mt-8 btn-wide" onClick={startGame}>
									Restart
								</button>
							</>
						)
					) : (
						<>
							<CustomSettings mode={gameMode.path} settings={settings} setSettings={setSettings} />
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
