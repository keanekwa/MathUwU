import React from "react"

interface ScoreHistoryProps {
	scoreHistory: Array<Score>
}

interface Score {
	id: number
	username: string
	score: number
}

const ScoreHistory = (props: ScoreHistoryProps) => {
	const { scoreHistory } = props
	const scoreHistoryArr = scoreHistory.map((s: Score) => s.score)

	return (
		<div className="mt-8">
			<strong>Score history &#40;from most recent to least recent&#41;:</strong>
			<div>{scoreHistoryArr.join(", ")}</div>
		</div>
	)
}

export default ScoreHistory
