import React from "react"
import { IScore } from "../../../interfaces/Game"

interface ScoreHistoryProps {
	scoreHistory: Array<IScore>
}

const ScoreHistory = (props: ScoreHistoryProps) => {
	const { scoreHistory } = props
	const scoreHistoryArr = scoreHistory.map((s: IScore) => s.score)

	return (
		<div>
			<strong>Score history &#40;from most recent to least recent&#41;:</strong>
			<div>{scoreHistoryArr.join(", ")}</div>
		</div>
	)
}

export default ScoreHistory
