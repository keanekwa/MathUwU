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

	return (
		<div>
			Previous scores &#40;from most recent to least recent&#41;:
			<ul>
				{scoreHistory.map((s: Score) => (
					<li>{s.score}</li>
				))}
			</ul>
		</div>
	)
}

export default ScoreHistory
