import React from "react"

interface ScoreProps {
	score: number
}

const Score = ({ score }: ScoreProps) => {
	return <div>Score: {score}</div>
}

export default Score
