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
		// description: "Arithmetic game with decimals.",
		description: "Coming soon.",
		disabled: true
	},
	FRACTIONS: {
		path: "/fractions",
		name: "Fractions",
		// description: "Arithmetic game with fractions.",
		description: "Coming soon.",
		disabled: true
	},
	EIGHTY_IN_EIGHT: {
		path: "/80in8",
		name: "80 in 8",
		// description: "Optiver's 80 in 8.",
		description: "Coming soon.",
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
