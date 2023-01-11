import { useState } from "react"

interface TimerProps {
	defaultSeconds: number
	setGameOver: () => void
}

const Timer = ({ defaultSeconds, setGameOver }: TimerProps) => {
	const [seconds, setSeconds] = useState(defaultSeconds)

	const countDownFn = () => {
		if (seconds === 0) {
			clearInterval(countDown)
			setGameOver()
		} else {
			setSeconds(seconds - 1)
		}
	}

	const countDown = setInterval(() => countDownFn(), 1000)

	return <div>{seconds === 0 ? <>Time's up!</> : <>Time Remaining: {seconds}</>}</div>
}

export default Timer
