import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhotoGrid from "../../components/portfolio/PhotoGrid";
import UserCard from "../../components/portfolio/UserCard";
import { TabContext } from "../../context/TabContext";
import { navigateSmooth } from "../../utils/helperFunctions";

const IndividualPortfolio = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the photographer ID from URL params
  const { teamMembers } = useContext(TabContext); // Get team members from context

  // Find the photographer by ID
  const photographer = teamMembers.find((member) => member.id === id);

  const backToPrevious = () => {
    // navigate(-1) -> gives a choppy transition between pages
    navigate("/portfolio");

    const scrollPositionY = sessionStorage.getItem('scrollPositionY');

    navigateSmooth(navigate, "/portfolio", "", parseInt(scrollPositionY || 0));

    if(scrollPositionY) {
      sessionStorage.removeItem('scrollPositionY');
    }
  };

  // Handle invalid photographer ID
  if (!photographer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photographer Not Found</h1>
          <p className="text-gray-600 mb-8">The photographer you are looking for does not exist.</p>
          <button onClick={backToPrevious} className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={backToPrevious}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Team
        </button>

        {/* Photographer Info */}
        <UserCard
          avatar={photographer.avatar}
          role={photographer.role}
          name={photographer.name}
          bio={photographer.bio}
          mail={photographer.mail}
          instagram={photographer.instagram}
        />

        {/* Photo Gallery */}
        <PhotoGrid photographer={photographer} />
      </div>
    </div>
  );
};

export default IndividualPortfolio;
