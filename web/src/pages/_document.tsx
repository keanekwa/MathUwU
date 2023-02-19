import { Html, Head, NextScript } from "next/document"
import { Main } from "next/document"

const Document = () => {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="utf-8" />
				<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
				<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png" />
				<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
				<meta name="theme-color" content="#ffffff" />
				<meta
					name="description"
					content="Gamified training platform for quantitative finance interviews. Challenge yourself to a series of mental arithmetic games to prepare for the quant world."
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
