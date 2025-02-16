import { FaArrowCircleRight } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router";
import {navigateSmooth} from "../../utils/helperFunctions"

function ViewAllCard({ text, link }) {

    const navigate = useNavigate();

    const handleViewAllClick = () => {
        navigateSmooth(navigate, link)
    }

    return (
        <div onClick={handleViewAllClick}>
            <div className={`cursor-pointer min-w-[160px] mx-2 py-4 px-4
            bg-tertiary hover:bg-complementSecondary
            rounded-[25px] text-white text-[16px] hover:text-primary font-bold
            transition-all duration-200 ease-linear
            hover:shadow-[0_10px_0px_0_rgba(0,0,0,0.2)]
            flex flex-row items-center justify-center gap-4`}
            >
                <FaArrowCircleRight className="" size={30} />
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}

ViewAllCard.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
}

export default ViewAllCard