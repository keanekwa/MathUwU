import React from "react"

interface TimerProps {
	seconds: number
}

const Timer = ({ seconds }: TimerProps) => {
	return <h6>Time Remaining: {seconds}</h6>
}

export default Timer
