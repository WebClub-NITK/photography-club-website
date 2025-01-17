import { Route, Routes } from "react-router"
import HomePage from "./pages/home"
import Header from "./components/header"
import Footer from "./components/footer"
import PortfolioPage from "./pages/portfolio"
import { ThemeProvider } from "./context/ThemeContext"

export default function App() {
	return (
		<div>
			<ThemeProvider>
				<Header />
				<div className="pt-[65px]">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/portfolio" element={<PortfolioPage />} />
					</Routes>
				</div>
				<Footer />
			</ThemeProvider>
		</div>
	)
}
