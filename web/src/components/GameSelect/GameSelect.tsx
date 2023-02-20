import React from "react"
import { GAME_MODES } from "./../../constants"
import GameSelectButton from "./GameSelectButton/GameSelectButton"

const GameSelect = () => {
	return (
		<div>
			<h2 className="text-xl text-center font-light mt-5 mb-14">Select a game mode:</h2>
			<div className="grid grid-cols-2 gap-5 gap-y-7 md:gap-12">
				{GAME_MODES.map((mode) => (
					<GameSelectButton key={mode.name} mode={mode} />
				))}
			</div>
		</div>
	)
}

export default GameSelect
