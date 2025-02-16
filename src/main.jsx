import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/markdown.css"
import "./index.css"
import "./styles/themes.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router"
import { TabContextProvider } from "./context/TabContext.jsx"

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<TabContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</TabContextProvider>
	</StrictMode>
)
