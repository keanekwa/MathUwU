import React from "react"

interface TimerProps {
	seconds: number
}

const Timer = ({ seconds }: TimerProps) => {
	return <h3>Time Remaining: {seconds}</h3>
}

export default Timer
