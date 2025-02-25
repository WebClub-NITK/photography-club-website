import { useState } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import noiseImage from '../../assets/images/noise.png';
import { ArrowLeft } from "lucide-react";
import { GrLocation } from "react-icons/gr";
import { MdEvent, MdDownload } from 'react-icons/md';
import { formatDateTime, getDifference } from '../../utils/dateHelpers';
import { navigateSmooth } from '../../utils/helperFunctions';
import { saveAs } from "file-saver";

const eventImages = [
    { src: "/photo-1.jpg", name: "event1.jpg" },
    { src: "/photo-1.jpg", name: "event2.jpg" },
    { src: "/photo-1.jpg", name: "event3.jpg" },
    { src: "/photo-1.jpg", name: "event4.jpg" },
    { src: "/photo-1.jpg", name: "event5.jpg" }

];

function EventPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState(null);

    // Determine if user came from home page
    const isFromHome = location.state?.from === 'home';
    const path = isFromHome ? '/' : '/events';

    const backToPrevious = () => {
        const scrollPositionY = sessionStorage.getItem('scrollPositionY');
        navigateSmooth(navigate, path, "", parseInt(scrollPositionY || 0));
        if (scrollPositionY) sessionStorage.removeItem('scrollPositionY');
    };

    const downloadImage = (url, name) => {
        saveAs(url, name);
    };

    return (
        <div className="max-w-container md:max-w-[80%] lg:max-w-[60%] mx-auto px-4 py-8">
            <button onClick={backToPrevious} className="flex items-center text-quaternary hover:text-primary mb-8 group">
                <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                {isFromHome ? "Go Back" : "All Events"}
            </button>

            <div className='relative z-[1] flex flex-col items-center gap-2 px-2 md:px-4 pt-5 mb-4 cursor-default'>
                {thisEvent.thumbnailColor && (
                    <div style={{ backgroundColor: thisEvent.thumbnailColor }} className="absolute inset-0 w-full h-full">
                        <img src={noiseImage} alt="noise" className="absolute inset-0 w-full h-full contrast-200 opacity-50 md:opacity-80 mix-blend-overlay pointer-events-none" />
                    </div>
                )}
                <p className="z-[2] font-playfair text-white text-[52px] font-medium leading-[1] py-2">{thisEvent.title}</p>
                <p className="z-[2] text-white uppercase text-[20px] font-medium leading-[0] py-3 pb-10">{getDifference(thisEvent.dateTime)}</p>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between'>
                <div className='flex flex-col gap-2 pt-2'>
                    <span className='flex items-center gap-2 font-bold text-md text-gray-500'>
                        <MdEvent size={24} /> {formatDateTime(thisEvent.dateTime)}
                    </span>
                    <span className='flex items-center gap-2 font-bold text-md text-gray-500'>
                        <GrLocation size={24} />
                        {thisEvent.locationLink ? (
                            <a href={thisEvent.locationLink} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500 transition-colors">{thisEvent.location}</a>
                        ) : (
                            thisEvent.location
                        )}
                    </span>
                </div>
                <div>
                    <button className="mt-10 w-[130px] rounded-[8px] bg-primary px-4 py-2 text-[14px] text-complementPrimary transition-all duration-200 hover:bg-red-400 hover:drop-shadow-xl md:mt-3" onClick={() => window.location.href = thisEvent.action.link}>
                        {thisEvent.action.text}
                    </button>
                </div>
            </div>
            <hr className='border-t-3 border-secondary my-10' />
            <MarkdownPreview wrapperElement={{ "data-color-mode": "light" }} source={thisEvent.content} className="wmde-markdown" />
            
            {/* Gallery Section */}
            <hr className="border-t-3 border-secondary my-10" />
            <h2 className="text-2xl font-bold mb-4">Captured Moments from NITK Events</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {eventImages.map((image, index) => (
                    <div key={index} className="relative group">
                        <img src={image.src} alt={`Event ${index + 1}`} className="w-full h-40 object-cover rounded-lg cursor-pointer" onClick={() => setSelectedImage(image.src)} />
                        <button onClick={() => downloadImage(image.src, image.name)} className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                            <MdDownload size={20} />
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
                    <img src={selectedImage} alt="Enlarged event" className="max-w-[90%] max-h-[80%] rounded-lg" />
                </div>
            )}
        </div>
    );
}

const thisEvent = {
    id: "incident-24",
    title: "Incident '25",
    content: `# Join Us for Incident '25 at NITK 2025!

**You're Invited!**

Get ready for an exciting multi-day experience at NITK's Main Building. This is your chance to be part of Incident '25, our premier event of 2025!

**Event Details:**

- **Event Name:** Incident '25
- **Date & Time:** March 04, 2025, 10:00 AM to March 08, 2025, 11:00 AM
- **Location:** Main Building, NITK

Don't miss out on this great opportunity to connect, learn, and celebrate. Mark your calendar, and we look forward to seeing you there!

[RSVP Here](#)`,
    action: { text: "RSVP Here", link: "#" },
    location: "Main Building, NITK",
    locationLink: "https://goo.gl/maps/1234567890",
    dateTime: "2025-02-16T10:00:00/2025-02-16T12:00:00",
    thumbnailColor: "#E195AB"
};

export default EventPage;
