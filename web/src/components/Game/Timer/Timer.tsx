import React from "react"

interface TimerProps {
	seconds: number
}

const Timer = ({ seconds }: TimerProps) => {
	return <div>{seconds === 0 ? <>Time's up!</> : <>Time Remaining: {seconds}</>}</div>
}

export default Timer
