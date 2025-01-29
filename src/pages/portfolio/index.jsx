import { Outlet } from "react-router-dom";
import PortfolioPage from "./portfolio";
function PortfolioLayout() {
  return (
    <div>
      <Outlet /> {/* Render child routes here */}
    </div>
  );
}

export default PortfolioLayout;
