import PropTypes from 'prop-types';
import noiseImage from '../../assets/images/noise.png'
import { GrLocation } from "react-icons/gr";
import { MdEvent } from "react-icons/md";
import { useNavigate } from 'react-router';

/*
*   Required thumbnail is of XxY size
*   Required EventsThumb color must be a 6 digit hex code 
*   that blends with white text
*/

function EventsThumb({ event, thinVariant = false, variant = "scroll" }) {
    const navigate = useNavigate();

    const handleEventClick = () => {
        navigate(`/events/${event.id}`);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const thumbnailColor = event.thumbnailColor || '#000000';

    const formatDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);

        // Format date: 2nd Jan 2025
        const day = date.getDate();
        const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 ? 0 : day % 10)];
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();

        // Format time: 4pm
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
                    ? 'h-[280px] md:h-[260px]'
                    : 'h-[380px] md:h-[260px]'
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
                { }
                <div className="absolute inset-0 p-4 flex flex-col justify-between h-full z-10 md:relative">
                    {/* Title at the top */}
                    <div>
                        <p className="font-playfair text-[32px] font-medium leading-[1]">
                            {event.title}
                        </p>
                    </div>

                    {/* Description truncates if more than available space */}
                    <div className="flex-1 my-2 overflow-hidden">
                        <p className="line-clamp-4">
                            {event.description}
                        </p>
                    </div>

                    {/* Event details at the bottom */}
                    <div className="flex flex-col md:flex-row md:gap-2 gap-3 mt-2 text-[14px] font-light">
                        <p className="flex flex-row items-center gap-2">
                            <GrLocation className="text-[20px]" />
                            {event.location}
                        </p>
                        <p className="flex flex-row items-center gap-2">
                            <MdEvent className="text-[20px]" />
                            <span>{formatDateTime(event.dateTime)}</span>
                        </p>
                    </div>
                </div>
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
    )
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
    thinVariant: PropTypes.bool,
    variant: PropTypes.oneOf(['scroll', 'grid']),
};

export default EventsThumb;