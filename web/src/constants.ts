import { IGameMode } from "./interfaces/Game"

export const GAME_MODES: { [key: string]: IGameMode } = {
	DEFAULT: {
		path: "default",
		name: "Default",
		description: "The default Zetamac-style arithmetic game with whole numbers.",
		disabled: false
	},
	DECIMALS: {
		path: "decimals",
		name: "Decimals",
		description: "[Coming soon] Arithmetic game with decimals.",
		disabled: true
	},
	FRACTIONS: {
		path: "fractions",
		name: "Fractions",
		description: "[Coming soon] Arithmetic game with fractions.",
		disabled: true
	},
	EIGHTY_IN_EIGHT: {
		path: "80in8",
		name: "80 in 8",
		description: "[Coming soon] Optiver's 80 in 8 assessment. Solve 80 questions in 8 minutes.",
		disabled: true
	}
}

export const OPERATORS = {
	ADD: "+",
	SUBTRACT: "-",
	MULTIPLY: "x",
	DIVIDE: "÷"
}

export const THEMES = {
	LIGHT: "cupcake",
	DARK: "dracula"
}
