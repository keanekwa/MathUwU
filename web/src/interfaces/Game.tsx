export interface IGameMode {
	path: string
	name: string
	description: string
	disabled: boolean
}

export interface ISettings {
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
