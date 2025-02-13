import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import noiseImage from '../../assets/images/noise.png'
import { ArrowLeft } from "lucide-react";
import { GrLocation } from "react-icons/gr";
import { MdEvent } from 'react-icons/md';
import { formatDateTime, getDifference } from '../../utils/dateHelpers';


function EventPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const backToPrevious = () => {
        navigate("/events");
        if (sessionStorage.getItem('scrollPosition')) {
            window.scrollTo({
                top: parseInt(sessionStorage.getItem('scrollPosition')),
                behavior: "smooth",
            });
        }
        sessionStorage.removeItem('scrollPosition');
    };

    return (
        <div className="max-w-container md:max-w-[80%] lg:max-w-[60%] mx-auto px-container-px md:px-container-px-md py-8">
            <button
                onClick={backToPrevious}
                className="flex items-center text-quaternary hover:text-primary mb-8 group"
            >
                <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                All Events
            </button>

            <div className='relative z-[1] flex flex-col items-center gap-2 px-2 md:px-4 pt-5 mb-4 cursor-default'>
                {thisEvent.thumbnailColor && (
                    <div
                        style={{ backgroundColor: thisEvent.thumbnailColor }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={noiseImage}
                            alt="noise"
                            className="absolute inset-0 w-full h-full contrast-200 opacity-50 md:opacity-80 mix-blend-overlay pointer-events-none"
                        />
                    </div>
                )}

                <p className="z-[2] font-playfair text-white text-[52px] font-medium leading-[1] py-2">
                    {thisEvent.title}
                </p>
                <p className="z-[2] text-white uppercase text-[20px] font-medium leading-[0] py-3 pb-10">
                    {getDifference(thisEvent.dateTime)}
                </p>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between'>
                <div className='flex flex-col gap-2 pt-2'>
                    <span className='flex items-center gap-2 font-bold text-md text-gray-500'>
                        <MdEvent size={24} />
                        {formatDateTime(thisEvent.dateTime)}
                    </span>
                    <span className='flex items-center gap-2 font-bold text-md text-gray-500'>
                        <GrLocation size={24} />
                        {thisEvent.locationLink ? (
                            <a href={thisEvent.locationLink} target="_blank" rel="noopener noreferrer"
                                className="underline hover:text-blue-500 transition-colors"
                            >
                                {thisEvent.location}
                            </a>
                        ) : (
                            thisEvent.location
                        )}
                    </span>
                </div>
                <div>
                    <button
                        className="mt-10 w-[130px] rounded-[8px] bg-primary px-4 py-2 
                            text-[14px] text-complementPrimary 
                            transition-all duration-200
                            hover:bg-red-400 hover:drop-shadow-xl
                            md:mt-3"
                        onClick={thisEvent.action.link}
                    >
                        {thisEvent.action.text}
                    </button>
                </div>
            </div>
            <hr className='border-t-3 border-secondary my-10' />
            <div className=''>
                <MarkdownPreview
                    wrapperElement={{
                        "data-color-mode": "light"
                    }}
                    source={thisEvent.content}
                />
            </div>
        </div>
    )
}

const thisEvent = {
    id: "incident-24",
    title: "Incident '25",
    content: `
# Join Us for Incident '25 at NITK 2025!

**You're Invited!**

Get ready for an exciting multi-day experience at NITK's Main Building. This is your chance to be part of Incident '24, our premier event of 2025!

**Event Details:**

- **Event Name:** Incident '24
- **Date & Time:** March 04, 2025, 10:00 AM to March 08, 2025, 11:00 AM
- **Location:** Main Building, NITK

Don't miss out on this great opportunity to connect, learn, and celebrate. Mark your calendar, and we look forward to seeing you there!

[RSVP Here](#)
    `,
    action: {
        text: "RSVP Here",
        link: "#"
    }, // optional
    location: "Main Building, NITK",
    locationLink: "https://goo.gl/maps/1234567890", // optional
    dateTime: "2025-02-16T10:00:00/2025-02-16T12:00:00",
    // if exact time - YYYY-MM-DDTHH:MM:SS
    // if time range - YYYY-MM-DDTHH:MM:SS/YYYY-MM-DDTHH:MM:SS
    thumbnailColor: "#E195AB"
}

export default EventPage