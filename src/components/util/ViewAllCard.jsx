import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function ViewAllCard({ text, link }) {

    const navigate = useNavigate();

    const handleViewAllClick = () => {
        navigate(link);
        window.scrollTo(
            {
                top: 0,
                left: 0,
                behavior: "smooth"
            }
        )
    }

    return (
        <Link to={link}>
            <div className={`min-w-[160px] mx-2 py-4 px-4
            bg-tertiary hover:bg-complementSecondary
            rounded-[25px] text-white text-[16px] hover:text-primary
            transition-all duration-300000 ease-linear
            hover:duration-50000
            shadow-[0_5px_10px_0_rgba(0,0,0,0.1)] hover:shadow-[0_10px_1px_0_rgba(0,0,0,0.2)]
            flex flex-row items-center justify-center gap-4`}
            >

                <FaArrowCircleRight className="" size={20} />
                <p className="font-medium">
                    {text}
                </p>
            </div>
        </Link>
    )
}


export default ViewAllCard