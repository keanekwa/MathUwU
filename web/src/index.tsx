import ReactDOM from "react-dom/client"
import "./index.css"
import Layout from "./components/Layout/Layout"
import Game from "./components/Game/Game"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<Layout>
		<Game />
	</Layout>
)
