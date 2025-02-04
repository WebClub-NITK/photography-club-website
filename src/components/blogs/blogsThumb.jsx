import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router";
import PropTypes from 'prop-types';


function BlogsThumb({ blog }) {
    const navigate = useNavigate();

    const handleBlogClick = () => {
        navigate(`/blogs/${blog.id}`);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className={`relative min-w-[max(40vw,200px)] md:min-w-[380px] h-[330px] md:h-[280px] rounded-[12px] overflow-hidden
                transition-all duration-100
                hover:cursor-pointer
                hover:rotate-[0.4deg] hover:scale-[0.985]
                flex flex-col ${!blog.image && "justify-end bg-secondary"}
                border-tertiary border-[2px] md:border-[1px]
                hover:border-[3px]
                `}
            onClick={handleBlogClick}

        >
            {blog.image && (
                <div className="w-full h-[150px]">
                    <img src={blog.image} alt={blog.title}
                        className="h-full object-cover rounded-[8px_8px_0_0]"
                    />
                </div>
            )}

            <div className={`text-primary flex flex-col gap-3 p-3 items-start justify-start 
                ${!blog.image && "rounded-[12px_12px_0_0] h-[90%] bg-complementPrimary"}
                `}>
                <p className="font-playfair text-[18px] font-medium leading-[1]">
                    {blog.title}
                </p>
                <p className="text-[14px]">
                    {blog.description}
                </p>
                <button className="text-tertiary text-[14px] font-medium 
                    flex flex-row items-center justify-start gap-2
                    hover:underline hover:underline-offset-4
                    ">
                    Read More
                    <FaAngleRight className="text-[14px]" />
                </button>
            </div>
        </div>
    )
}

BlogsThumb.propTypes = {
    blog: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string,
    }).isRequired,
};

export default BlogsThumb