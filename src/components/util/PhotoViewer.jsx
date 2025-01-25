import PropTypes from 'prop-types';
import { IoIosClose } from "react-icons/io";
import { useEffect } from 'react';

function SimplePhotoViewer({
    isOpen,
    photo,
    caption,
    date,
    itemsInPhoto, // optional: array of strings that could be people or things in photo
    onClose
}) {
    useEffect(() => {
        if (!isOpen) return;

        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const scrollDifference = Math.abs(window.scrollY - lastScrollY);
            if (scrollDifference > 100) { // Close after 100px of scroll
                onClose();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen, onClose]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        return `${day}${daySuffix(day)}, ${month}, ${year}`;
    };

    const dateFormatted = date ? formatDate(date) : null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center 
                bg-black bg-opacity-80 backdrop-blur-md text-white
                transition-all duration-300 
                ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center gap-6 p-6">
                {/* Image Container */}
                <div className="w-full md:w-2/3">
                    <img
                        src={photo}
                        alt="Selected Photo"
                        className="w-full h-auto max-h-[70vh] object-contain rounded-[8px]"
                    />
                </div>
                <div className="w-full px-2 md:w-auto md:flex-grow-[3] mt-2 md:mt-0 flex flex-col items-start gap-1 justify-center md:ml-5 md:gap-4">
                    <p className="bg-blue-300/10 px-1 py-[0.5] rounded-md  text-lg">{caption}</p>
                    {date && (
                        <p className="ml-1 mt-2">
                            <span>Captured on</span>
                            <p className="tracking-wider font-thin text-sm md:text-base">{dateFormatted}</p>
                        </p>
                    )}
                    {itemsInPhoto && (
                        <p className="ml-1 mt-2">
                            <span>In this photo</span>
                            <p className="tracking-wider font-thin text-sm md:text-base">{itemsInPhoto.join(', ')}</p>
                        </p>
                    )}

                    <button
                        onClick={onClose}
                        className="mt-4 md:mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 
                                rounded-lg transition-colors duration-200
                                flex items-center gap-2"
                    >
                        <IoIosClose size={24} />
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

SimplePhotoViewer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    photo: PropTypes.string.isRequired,
    caption: PropTypes.element,
    onClose: PropTypes.func.isRequired,
    date: PropTypes.string,
    itemsInPhoto: PropTypes.arrayOf(PropTypes.string)
};

export default SimplePhotoViewer