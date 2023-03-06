import Layout from "@/components/Layout/Layout"
import GameSelect from "@/components/GameSelect/GameSelect"
import Head from "next/head"

const Index = () => {
	return (
		<>
			<Head>
				<meta property="og:title" content="MathUwU | Arithmetic Zetamac & Quant Interviews Made Fun" key="title" />
				<meta
					name="description"
					content="MathUwU is a gamified quantitative finance interview preparation platform, with mental math games like Arithmetic Zetamac and other brainteasers."
				/>
			</Head>
			<Layout>
				<GameSelect />
			</Layout>
		</>
	)
}

export default Index
