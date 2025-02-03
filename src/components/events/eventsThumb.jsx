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

function EventsThumb({ event }) {
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
        <div className="relative min-w-[250px] md:min-w-[460px] lg:min-w-[490px] h-[380px] md:h-[260px] rounded-[8px] overflow-hidden
                transition-all duration-100
                hover:cursor-pointer hover:shadow-[0px_3px_6px_0px_rgba(0,_0,_0,_0.3)] 
                hover:rotate-[0.3deg] hover:scale-[0.985]
                "
            onClick={handleEventClick}
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
                <div className="w-full p-4
                    flex flex-col gap-4 justify-between
                    z-10 md:z-0
                    absolute md:relative"
                >
                    <div className="flex flex-col gap-3">
                        <p className="font-playfair text-[32px] font-medium leading-[1]">
                            {event.title}
                        </p>
                        <p>
                            {event.description}
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-2 gap-3 mt-2 text-[14px] font-light">
                        <p className="flex flex-row items-top gap-2">
                            <GrLocation className="text-[20px]" />
                            {event.location}
                        </p>
                        <p className="flex flex-row items-top gap-2">
                            <MdEvent className="text-[20px]" />
                            <span>{formatDateTime(event.dateTime)}</span>
                        </p>
                    </div>
                </div>
                {event.image && (
                    <div className="relative w-full md:w-[200px] h-full">
                        <img src={event.image} alt={event.title}
                            className="h-full object-cover rounded-[0_8px_8px_0]"
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
};

export default EventsThumb