import Layout from "../components/Layout/Layout"
import Head from "next/head"
import GameSelect from "../components/GameSelect/GameSelect"

const Index = () => {
	return (
		<Layout>
			<Head>
				<title>MathUwU</title>
				<meta charSet="utf-8" />
				<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png" />
				<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#ffffff" />
				<meta
					name="description"
					content="Gamified training platform for quantitative finance interviews. Challenge yourself to a series of mental arithmetic games to prepare for the quant world."
				/>
			</Head>
			<GameSelect />
		</Layout>
	)
}

export default Index
