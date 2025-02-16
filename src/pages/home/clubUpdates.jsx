import ScrollView from "../../components/util/ScrollView";
import { FaAngleRight } from "react-icons/fa6";
import EventsThumb from "../../components/events/eventsThumb";
import BlogsThumb from "../../components/blogs/blogsThumb";
import ViewAllCard from "../../components/util/ViewAllCard";
import { useNavigate } from 'react-router';
import { useState, useRef } from 'react'
import PropTypes from 'prop-types';
import { navigateSmooth } from "../../utils/helperFunctions";


function ClubUpdates({ events, blogs }) {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
    const eventsContainerRef = useRef(null);
    const blogsContainerRef = useRef(null);
    const navigate = useNavigate();


    const handleAllBlogsClick = () => {
        navigateSmooth(navigate, "/blogs")
    }

    const handleAllEventsClick = () => {
        navigateSmooth(navigate, "/events")
    }


    return (
        <div>
            <p className="text-tertiary text-[14px] font-bold uppercase">
                Stay In The Loop
            </p>
            {/* Events */}
            <div className="flex flex-col gap-4 pt-4">
                <div className="flex flex-row items-center justify-between">
                    <p
                        className="cursor-pointer flex flex-row items-end justify-start gap-2
                            hover:gap-3 transition-all duration-300 ease-in-out text-primary"
                        onClick={() => handleAllEventsClick()}
                    >
                        <p className="font-playfair text-[32px] font-medium leading-[1]">
                            Club Events
                        </p>
                        <FaAngleRight className="text-[24px]" />
                    </p>
                    <ScrollView
                        currentIndex={currentEventIndex}
                        setCurrentIndex={setCurrentEventIndex}
                        totalImages={events.length}

                        scrollType="view"
                        containerRef={eventsContainerRef}
                        imageWidth={450}
                        imageGap={14}

                        speed={1}
                        showSlideNumbers={false}
                    />
                </div>
                <div
                    style={{ scrollbarWidth: "none" }}
                    className="overflow-x-auto overflow-y-hidden"
                    ref={eventsContainerRef}
                >
                    <div className="flex flex-row items-center gap-[14px] pt-2 pb-3">
                        {events.map((event, index) => (
                            <EventsThumb event={event} key={index} isOnHomePage/>
                        ))}
                        <ViewAllCard text="All Events" link="/events" />
                    </div>
                </div>
            </div>
            {/* Blogs */}
            <div className="flex flex-col gap-4 pt-4">
                <div className="flex flex-row items-center justify-between">
                    <p
                        className="cursor-pointer flex flex-row items-end justify-start gap-2
                            hover:gap-3 transition-all duration-300 ease-in-out text-primary"
                        onClick={() => handleAllBlogsClick()}
                    >
                        <p className="font-playfair text-[32px] font-medium leading-[1]">
                            Blogs
                        </p>
                        <FaAngleRight className="text-[24px]" />
                    </p>
                    <ScrollView
                        currentIndex={currentBlogIndex}
                        setCurrentIndex={setCurrentBlogIndex}
                        totalImages={blogs.length}

                        scrollType="view"
                        containerRef={blogsContainerRef}
                        imageWidth={380}
                        imageGap={14}

                        speed={1}
                        showSlideNumbers={false}
                    />
                </div>
                <div
                    style={{ scrollbarWidth: "none" }}
                    className="overflow-x-auto overflow-y-hidden px-1"
                    ref={blogsContainerRef}
                >
                    <div className="flex flex-row items-center gap-[14px] pt-2 pb-3">
                        {blogs.map((blog, index) => (
                            <BlogsThumb blog={blog} key={index} variant="scroll" />
                        ))}
                        <ViewAllCard text="All Blogs" link="/blogs" />
                    </div>
                </div>
            </div>
        </div>
    )
}

ClubUpdates.propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string, // optional
        thumbnailColor: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        dateTime: PropTypes.string.isRequired,
    })).isRequired,
    blogs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string,
    })).isRequired,
};

export default ClubUpdates