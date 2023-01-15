import React from "react"
import { Link } from "react-router-dom"
import { GameModeType } from "./../../../constants"

export interface GameSelectButtonProps {
	mode: GameModeType
}

const GameSelectButton = ({ mode }: GameSelectButtonProps) => {
	let classes = "justify-center text-center m-10 p-12 rounded-lg shadow-lg"
	const enabledClasses = "bg-sky-300/[.1] hover:bg-sky-300/[.08] focus:shadow-md active:bg-sky-400/[.06]"
	const disabledClasses = "bg-neutral-400/[.05] cursor-not-allowed"

	if (mode.disabled) {
		classes = classes + " " + disabledClasses
	} else {
		classes = classes + " " + enabledClasses
	}

	return (
		<Link
			to={"/game" + mode.path}
			onClick={mode.disabled ? (event) => event.preventDefault() : (event) => 0}
			key={mode.path}
			className={classes}>
			<h5>{mode.name}</h5>
			<p>{mode.description}</p>
		</Link>
	)
}

export default GameSelectButton
