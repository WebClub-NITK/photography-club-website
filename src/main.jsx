import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
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
