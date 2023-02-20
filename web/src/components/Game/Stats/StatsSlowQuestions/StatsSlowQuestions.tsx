import React from "react"
import { IQuestionAnswered } from "../../../../lib/interfaces/game.interfaces"

interface StatsSlowQuestionsProps {
	questionsAnswered: IQuestionAnswered[]
}

const StatsSlowQuestions = ({ questionsAnswered }: StatsSlowQuestionsProps) => {
	let slowestQuestions = [...questionsAnswered]
	slowestQuestions.sort((a, b) => (a.duration < b.duration ? 1 : -1))
	if (slowestQuestions.length > 5) {
		slowestQuestions = slowestQuestions.slice(0, 5)
	}

	return (
		<div>
			<h3>You might need some work on these:</h3>
			{slowestQuestions.map((q, id) => (
				<p key={id}>{`${q.numbers.vars[0]} ${q.operator} ${q.numbers.vars[1]} = ${q.numbers.ans} (${(
					q.duration / 1000
				).toFixed(2)}s)`}</p>
			))}
		</div>
	)
}

export default StatsSlowQuestions
