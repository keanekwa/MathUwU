import Game from "@/components/Game/Game"
import Layout from "@/components/Layout/Layout"
import Head from "next/head"

const Mode = () => {
	return (
		<>
			<Head>
				<title>MathUwU | Arithmetic Zetamac & Quant Interviews Made Fun</title>
				<meta
					name="description"
					content="MathUwU is a gamified quantitative finance interview preparation platform, with mental math games like Arithmetic Zetamac and other brainteasers."
				/>
			</Head>
			<Layout>
				<Game />
			</Layout>
		</>
	)
}

export default Mode
