import React from "react"
import { Link } from "react-router-dom"
import { IGameMode } from "../../../interfaces/Game"

export interface GameSelectButtonProps {
	key: string
	mode: IGameMode
}

const GameSelectButton = ({ mode }: GameSelectButtonProps) => {
	let classes = "justify-center text-center py-10 px-5 md:p-12 rounded-lg border-2"
	const enabledClasses = "bg-base-300 shadow-lg hover:bg-base-300/[.75] focus:bg-base-300/[.9]"
	const disabledClasses = "bg-base-200/[.3] opacity-60 cursor-not-allowed"

	if (mode.disabled) {
		classes = classes + " " + disabledClasses
	} else {
		classes = classes + " " + enabledClasses
	}

	return (
		<Link
			to={"/game" + mode.path}
			onClick={mode.disabled ? (event) => event.preventDefault() : (event) => 0}
			className={classes}>
			<h2>{mode.name}</h2>
			<p>{mode.description}</p>
		</Link>
	)
}

export default GameSelectButton
