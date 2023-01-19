import React from "react"
import { GAME_MODES } from "./../../constants"
import GameSelectButton from "./GameSelectButton/GameSelectButton"

const GameSelect = () => {
	return (
		<div>
			<p className="text-xl text-center font-light mt-12 mb-14">Select a game mode:</p>
			<div className="grid grid-cols-4">
				{Object.values(GAME_MODES).map((mode) => (
					<GameSelectButton key={mode.name} mode={mode} />
				))}
			</div>
		</div>
	)
}

export default GameSelect
