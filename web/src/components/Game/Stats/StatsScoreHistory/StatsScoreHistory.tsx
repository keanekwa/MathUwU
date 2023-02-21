import React from "react"
import { IScore } from "@/lib/interfaces/game.interfaces"

interface StatsScoreHistoryProps {
	scoreHistory: Array<IScore>
}

const StatsScoreHistory = (props: StatsScoreHistoryProps) => {
	const { scoreHistory } = props
	const scoreHistoryArr = scoreHistory.map((s: IScore) => s.score)

	return (
		<div>
			<h3>Score history &#40;from most recent to least recent&#41;:</h3>
			<div>{scoreHistoryArr.join(", ")}</div>
		</div>
	)
}

export default StatsScoreHistory
