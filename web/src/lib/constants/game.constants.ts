import {
	I80in8Settings,
	IDecimalSettings,
	IFractionSettings,
	IGameMode,
	ISettings
} from "@/lib/interfaces/game.interfaces"

export const DEFAULT_SETTINGS: ISettings = {
	isAdd: true,
	isSubtract: true,
	isDivide: true,
	isMultiply: true,
	add1: [2, 100],
	add2: [2, 100],
	multiply1: [2, 12],
	multiply2: [2, 100],
	seconds: 120
}

export const DEFAULT_DECIMAL_SETTINGS: IDecimalSettings = {
	...DEFAULT_SETTINGS,
	decimalPlaces: 2
}

export const DEFAULT_FRACTION_SETTINGS: IFractionSettings = {
	...DEFAULT_SETTINGS,
	decimalPlaces: 2
}

export const DEFAULT_80IN8_SETTINGS: I80in8Settings = {
	...DEFAULT_SETTINGS,
	decimalPlaces: 2
}

export const OPERATORS = {
	ADD: "+",
	SUBTRACT: "-",
	MULTIPLY: "x",
	DIVIDE: "÷"
}

export const GAME_MODES: IGameMode[] = [
	{
		path: "default",
		name: "Default",
		description: "The default Zetamac-style arithmetic game with whole numbers.",
		disabled: false,
		defaultSettings: DEFAULT_SETTINGS
	},
	{
		path: "decimals",
		name: "Decimals",
		description: "Arithmetic game with decimals.",
		disabled: false,
		defaultSettings: DEFAULT_DECIMAL_SETTINGS
	},
	{
		path: "fractions",
		name: "Fractions",
		description: "[Coming soon] Arithmetic game with fractions.",
		disabled: true,
		defaultSettings: DEFAULT_FRACTION_SETTINGS
	},
	{
		path: "80in8",
		name: "80 in 8",
		description: "[Coming soon] Optiver's 80 in 8 assessment. Solve 80 questions in 8 minutes.",
		disabled: true,
		defaultSettings: DEFAULT_80IN8_SETTINGS
	}
]
