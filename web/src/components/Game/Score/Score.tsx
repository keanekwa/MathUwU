import React from "react"

interface ScoreProps {
	score: number
}

const Score = ({ score }: ScoreProps) => {
	return <h3>Score: {score}</h3>
}

export default Score
