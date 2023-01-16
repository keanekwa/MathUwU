import React from "react"

interface ScoreProps {
	score: number
}

const Score = ({ score }: ScoreProps) => {
	return <h6>Score: {score}</h6>
}

export default Score
