export interface IGameMode {
	path: string
	name: string
	description: string
	disabled: boolean
	defaultSettings: ISettings
}

export interface ISettings {
	[x: string]: any
	isAdd: boolean
	isSubtract: boolean
	isDivide: boolean
	isMultiply: boolean
	add1: [number, number]
	add2: [number, number]
	multiply1: [number, number]
	multiply2: [number, number]
	seconds: number
}

export interface IDecimalSettings extends ISettings {
	decimalPlaces: number
}

export interface IFractionSettings extends ISettings {
	decimalPlaces: number
}

export interface I80in8Settings extends ISettings {
	decimalPlaces: number
}

export interface IQuestionAnswered {
	operator: string
	numbers: {
		vars: number[]
		ans: number
	}
	duration: number
}

export interface IScore {
	id: number
	username: string
	score: number
}
