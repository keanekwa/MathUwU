import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../../App"
import { IQuestionAnswered, IScore } from "../../../interfaces/Game"
import StatsChart from "./StatsChart/StatsChart"
import StatsOverview from "./StatsOverview/StatsOverview"
import StatsScoreHistory from "./StatsScoreHistory/StatsScoreHistory"
import StatsSlowQuestions from "./StatsSlowQuestions/StatsSlowQuestions"

interface StatsProps {
	score: number
	seconds: number
	percentile: number
	questionsAnswered: IQuestionAnswered[]
	scoreHistory: IScore[]
}

const Stats = ({ score, seconds, percentile, questionsAnswered, scoreHistory }: StatsProps) => {
	const [user] = useContext(UserContext)

	return (
		<div className="w-full grid gap-y-5">
			<StatsOverview score={score} seconds={seconds} percentile={percentile} />
			<div className="px-12 mt-5 grid gap-y-5">
				{questionsAnswered.length > 0 && (
					<>
						<StatsChart questionsAnswered={questionsAnswered} />
						<StatsSlowQuestions questionsAnswered={questionsAnswered} />
					</>
				)}
				{/* {user ? (
					<StatsScoreHistory scoreHistory={scoreHistory} />
				) : (
					<Link to="/login">
						<button className="link">Login to save scores.</button>
					</Link>
				)} */}
			</div>
		</div>
	)
}

export default Stats
