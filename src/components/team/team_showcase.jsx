import { useContext } from "react";
import { TeamMember } from "./team_member";
import { TabContext } from "../../context/TabContext";
import { useNavigate } from "react-router-dom";
import { navigateSmooth } from "../../utils/helperFunctions";

export function TeamShowcase() {
  const navigate = useNavigate();
  const { teamMembers, activeItem, searchQuery } = useContext(TabContext);

  // Filter members based on selected team and search query
  const selectedTeamMembers = teamMembers.filter(
    (member) => activeItem === "View all" || member.team === activeItem
  );

  const finalMembers = selectedTeamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to individual portfolio page
  const goToIndividualPortfolio = (id) => {
    sessionStorage.setItem('scrollPositionY', window.scrollY);
    navigateSmooth(navigate, `/portfolio/${id}`);
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalMembers.map((member) => (
            <TeamMember
              key={member.id}
              name={member.name}
              role={member.role}
              imageUrl={member.avatar}
              onClick={() => goToIndividualPortfolio(member.id)} // Pass click handler
            />
          ))}
        </div>
      </div>
    </div>
  );
}
