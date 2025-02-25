import PropTypes from 'prop-types';
import noiseImage from '../../assets/images/noise.png';
import { GrLocation } from "react-icons/gr";
import { MdEvent } from "react-icons/md";
import { useNavigate } from 'react-router';
import { navigateSmooth } from '../../utils/helperFunctions';

function EventsThumb({ event, isOnHomePage = false, thinVariant = false, variant = "scroll" }) {
    const navigate = useNavigate();
    
    const handleEventClick = () => {
        const fromPage = isOnHomePage ? 'home' : 'events';
        navigateSmooth(navigate, `/events/${event.id}`, fromPage);
    };

    const thumbnailColor = event.thumbnailColor || '#000000';

    const formatDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        const day = date.getDate();
        const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 ? 0 : day % 10)];
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const displayHours = hours % 12 || 12;

        return `${day}${suffix} ${month} ${year} | ${displayHours}${ampm}`;
    };

    return (
        <div
            onClick={handleEventClick}
            className={`relative overflow-hidden rounded-[12px]
                transition-all duration-100
                hover:cursor-pointer hover:shadow-[3px_3px_8px_1px_rgba(0,_0,_0,_0.3)] 
                hover:rotate-[0.3deg] hover:scale-[0.985]
                hover:border-[complementSecondary] hover:border-[3px]
                ${variant === "scroll"
                    ? "min-w-[250px] md:min-w-[460px] lg:min-w-[490px] lg:max-w-[80%]"
                    : "w-full"
                }
                ${thinVariant
                    ? 'h-[240px] md:h-[260px]' /* Reduced height */
                    : 'h-[280px] md:h-[260px]' /* Reduced height */
                }`}
        >
            {/* Background color and noise overlay container */}
            <div
                style={{ backgroundColor: thumbnailColor }}
                className="absolute inset-0 w-full h-full"
            >
                <img
                    src={noiseImage}
                    alt="noise"
                    className="absolute inset-0 w-full h-full contrast-200 opacity-45 md:opacity-35 mix-blend-overlay pointer-events-none"
                />
            </div>

            {/* Content container */}
            <div className="relative w-full h-full text-white text-[14px] font-medium flex flex-row">
                <div className="absolute inset-0 p-3 flex flex-col justify-between h-full z-10 md:relative">
                    {/* Title at the top */}
                    <div>
                        <p className="font-playfair text-[24px] md:text-[32px] font-medium leading-[1]">
                            {event.title}
                        </p>
                    </div>

                    {/* Description truncates if more than available space */}
                    <div className="flex-1 my-1 overflow-hidden">
                        <p className="line-clamp-3"> {/* Reduced to 3 lines */}
                            {event.description}
                        </p>
                    </div>

                    {/* Event details at the bottom */}
                    <div className="flex flex-col md:flex-row md:gap-2 gap-2 mt-1 text-[13px] font-light">
                        <p className="flex flex-row items-center gap-2">
                            <GrLocation className="text-[18px]" /> {/* Slightly smaller icon */}
                            {event.location}
                        </p>
                        <p className="flex flex-row items-center gap-2">
                            <MdEvent className="text-[18px]" />
                            <span>{formatDateTime(event.dateTime)}</span>
                        </p>
                    </div>
                </div>

                {/* Event Image (if available) */}
                {event.image && (
                    <div className={`relative object-cover object-center h-full
                        ${variant === "scroll" ? "md:w-[200px]" : "md:w-[280px]"}
                        w-full`}
                    >
                        <img src={event.image} alt={event.title}
                            className="absolute inset-0 w-full h-full object-cover rounded-[0_8px_8px_0]"
                        />
                        {/* Overlay To Tint Image */}
                        <div
                            style={{ background: `linear-gradient(to right, ${thumbnailColor}, transparent)` }}
                            className="absolute inset-0 w-full h-full opacity-80 rounded-[0_8px_8px_0]"
                        />
                        <div
                            style={{ background: `${thumbnailColor}` }}
                            className="absolute inset-0 w-full opacity-55 md:opacity-25 h-full rounded-[0_8px_8px_0]"
                        />
                        <div
                            className="absolute inset-0 bg-black opacity-30 md:hidden h-full w-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

EventsThumb.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        dateTime: PropTypes.string.isRequired,
        image: PropTypes.string,
        thumbnailColor: PropTypes.string,
    }).isRequired,
    isOnHomePage: PropTypes.bool,
    thinVariant: PropTypes.bool,
    variant: PropTypes.oneOf(['scroll', 'grid']),
};

export default EventsThumb;
