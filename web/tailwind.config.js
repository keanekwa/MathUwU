const colors = require("tailwindcss/colors")

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				majorMonoDisplay: ["Major Mono Display"]
			},
			colors: {
				slate: colors.slate,
				gray: colors.gray,
				zinc: colors.zinc,
				neutral: colors.neutral,
				stone: colors.stone,
				red: colors.red,
				orange: colors.orange,
				amber: colors.amber,
				yellow: colors.yellow,
				lime: colors.lime,
				green: colors.green,
				emerald: colors.emerald,
				teal: colors.teal,
				cyan: colors.cyan,
				sky: colors.sky,
				blue: colors.blue,
				indigo: colors.indigo,
				violet: colors.violet,
				purple: colors.purple,
				fuchsia: colors.fuchsia,
				pink: colors.pink,
				rose: colors.rose
			}
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "1rem",
				lg: "8rem",
				xl: "14rem",
				"2xl": "20rem"
			}
		}
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: ["cupcake", "dracula"]
	}
}
