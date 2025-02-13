import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router";
import PropTypes from 'prop-types';

function BlogsThumb({ blog, variant = "scroll" }) {
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
        <div className={`relative rounded-[12px] overflow-hidden
                bg-lime-100/10
                transition-all duration-100
                hover:cursor-pointer
                hover:rotate-[0.5deg] hover:scale-[0.98]
                flex flex-col ${!blog.image && "justify-end bg-secondary"}
                border-tertiary border-[1px]
                hover:border-tertiary
                before:absolute before:inset-0 before:rounded-[12px]
                before:border-tertiary before:border-[5px] before:opacity-0
                hover:before:opacity-80
                before:transition-opacity

                ${variant === "scroll"
                ? "min-w-[max(40vw,200px)] md:min-w-[380px] md:max-w-[380px]"
                : "w-full"
            }
                h-full
                `}
            onClick={handleBlogClick}
        >
            {blog.image && (
                <div className="w-full h-[150px]">
                    <img src={blog.image} alt={blog.title}
                        className="h-full w-full object-cover rounded-[8px_8px_0_0]"
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
                    {blog.description.length > 100 ? `${blog.description.substring(0, 100)}...` : blog.description}
                </p>
                <button className="text-tertiary text-[14px] font-medium 
                    flex flex-row items-center justify-start gap-2
                    hover:underline hover:underline-offset-4
                    mt-auto
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
    variant: PropTypes.oneOf(['scroll', 'grid']),
};

export default BlogsThumb