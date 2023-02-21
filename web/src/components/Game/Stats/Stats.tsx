import React /*, { useContext }*/ from "react"
import { IQuestionAnswered, IScore } from "@/lib/interfaces/game.interfaces"
import StatsChart from "./StatsChart/StatsChart"
import StatsOverview from "./StatsOverview/StatsOverview"
// import StatsScoreHistory from "./StatsScoreHistory/StatsScoreHistory"
import StatsSlowQuestions from "./StatsSlowQuestions/StatsSlowQuestions"

interface StatsProps {
	score: number
	seconds: number
	percentile: number
	questionsAnswered: IQuestionAnswered[]
	scoreHistory: IScore[]
	isDefaultSettings: boolean
}

const Stats = ({ score, seconds, percentile, questionsAnswered, scoreHistory, isDefaultSettings }: StatsProps) => {
	// const [user] = useContext(UserContext)

	return (
		<div className="w-full grid gap-y-5">
			<StatsOverview score={score} seconds={seconds} percentile={percentile} isDefaultSettings={isDefaultSettings} />
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
