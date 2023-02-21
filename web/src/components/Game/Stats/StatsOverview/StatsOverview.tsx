import React from "react"

interface StatsOverviewProps {
	score: number
	seconds: number
	percentile: number
	isDefaultSettings: boolean
}

const StatsOverview = ({ score, seconds, percentile, isDefaultSettings }: StatsOverviewProps) => {
	return (
		<div className="stats stats-vertical md:stats-horizontal shadow bg-base-200 border-2">
			<div className="stat">
				<div className="stat-figure text-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-7 h-7">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
						/>
					</svg>
				</div>
				<div className="stat-title">Total Score</div>
				<div className="stat-value text-primary">{score}</div>
				<div className="stat-desc">Over {seconds} seconds</div>
			</div>

			<div className="stat">
				<div className="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-7 h-7">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
						/>
					</svg>
				</div>
				<div className="stat-title">Avg Calculation Time</div>
				<div className="stat-value text-secondary">
					{score === 0 ? <>&infin;</> : `${(seconds / score).toFixed(2)}s`}
				</div>
				<div className="stat-desc">Total score / {seconds} seconds</div>
			</div>
			{isDefaultSettings && (
				<div className="stat">
					<div className="stat-figure">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-7 h-7">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
							/>
						</svg>
					</div>
					<div className="stat-title">Better than</div>
					<div className="stat-value">{(percentile * 100).toFixed(1)}%</div>
					<div className="stat-desc">of users</div>
				</div>
			)}
		</div>
	)
}

export default StatsOverview
