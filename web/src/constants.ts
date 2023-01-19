import { IGameMode } from "./interfaces/Game"

export const GAME_MODES: { [key: string]: IGameMode } = {
	DEFAULT: {
		path: "/default",
		name: "Default",
		description: "The default arithmetic game with whole numbers.",
		disabled: false
	},
	DECIMALS: {
		path: "/decimals",
		name: "Decimals",
		description: "Arithmetic game with decimals.",
		disabled: true
	},
	FRACTIONS: {
		path: "/fractions",
		name: "Fractions",
		description: "Arithmetic game with fractions.",
		disabled: true
	},
	EIGHTY_IN_EIGHT: {
		path: "/80in8",
		name: "80 in 8",
		description: "Optiver's 80 in 8.",
		disabled: true
	}
}

export const OPERATORS = {
	ADD: "+",
	SUBTRACT: "-",
	MULTIPLY: "x",
	DIVIDE: "÷"
}
