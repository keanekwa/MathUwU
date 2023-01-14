import React from "react"

interface TimerProps {
	seconds: number
}

declare module "react" {
	// augment CSSProperties here
	interface CSSProperties {
		"--value"?: string | number
		"--size"?: string | number
		"--thickness"?: string | number
	}
}

const Timer = ({ seconds }: TimerProps) => {
	return (
		<div>
			{seconds === 0 ? (
				<>Time's up!</>
			) : (
				<>
					Time Remaining:{" "}
					<div className="grid grid-flow-col gap-5 text-center auto-cols-max">
						<div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
							<span className="countdown font-mono text-5xl">
								<span style={{ "--value": seconds }}></span>
							</span>
							sec
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Timer
