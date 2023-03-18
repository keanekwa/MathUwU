import Layout from "@/components/Layout/Layout"
import GameSelect from "@/components/GameSelect/GameSelect"
import Head from "next/head"

const Index = () => {
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
				<div itemScope itemType="https://schema.org/WebSite">
					<meta itemProp="url" content="https://mathuwu.com/" />
					<meta itemProp="name" content="MathUwU" />
				</div>
				<GameSelect />
			</Layout>
		</>
	)
}

export default Index
