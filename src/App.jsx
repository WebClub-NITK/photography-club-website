import { Route, Routes } from "react-router"
import HomePage from "./pages/home"
import Header from"./components/header"
import Footer from "./components/footer"
import PortfolioPage from "./pages/portfolio"

export default function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/portfolio" element={<PortfolioPage />} />
			</Routes>
			<Footer />
		</div>
	)
}
