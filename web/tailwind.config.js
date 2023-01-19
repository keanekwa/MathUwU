const colors = require("tailwindcss/colors")

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
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
			center: true
		}
	},
	plugins: [require("daisyui")]
}
