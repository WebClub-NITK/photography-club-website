import PropTypes from 'prop-types';
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import { PiMouseScrollThin } from "react-icons/pi";

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
            if (scrollDifference > 50) { // Close after 50px of scroll
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

    const [imageDimensions, setImageDimensions] = useState(null);

    useEffect(() => {
        if (!isOpen || !photo) return;

        const img = new Image();
        img.src = photo;

        img.onload = () => {
            setImageDimensions({
                width: img.naturalWidth,
                height: img.naturalHeight,
                aspectRatio: img.naturalWidth / img.naturalHeight
            });
        };
    }, [isOpen, photo]);

    const dateFormatted = date ? formatDate(date) : null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center 
            bg-gradient-to-t from-black/90 to-black/20 bg-opacity-80 backdrop-blur-md
            transition-all duration-300
            ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
            <div className="w-[95%] h-[90vh] md:h-[85vh] max-w-[1400px] mx-auto
                flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                {/* Image Container */}
                <div className={`relative w-full md:w-auto md:flex-1 h-[60vh] md:h-full 
                    flex items-center justify-center
                    ${imageDimensions?.aspectRatio > 1 ? 'md:max-w-[75%]' : 'md:max-w-[60%]'}`}>
                    <img
                        src={photo}
                        alt="Selected Photo"
                        className="max-w-full max-h-full w-auto h-auto 
                            min-w-[300px] min-h-[300px]
                            object-contain rounded-lg"
                    />
                </div>

                {/* Info Container */}
                <div className="w-full md:w-auto md:min-w-[300px] md:max-w-[400px] 
                    flex flex-col justify-start text-white space-y-4 p-4">
                    {caption && (
                        <p className="text-lg md:text-xl">{caption}</p>
                    )}

                    {date && (
                        <p className="text-sm md:text-base opacity-80">
                            {dateFormatted}
                        </p>
                    )}

                    {itemsInPhoto && itemsInPhoto.length > 0 && (
                        <p className="text-sm md:text-base opacity-80">
                            {itemsInPhoto.join(', ')}
                        </p>
                    )}

                    <button
                        onClick={onClose}
                        className="mt-auto px-4 py-2 bg-white/10 hover:bg-white/20 
                            rounded-lg transition-colors duration-200
                            flex items-center gap-2"
                    >
                        <IoIosClose size={24} />
                        Close
                    </button>
                </div>
            </div>
            <span className="absolute bottom-5 text-[16px] tracking-wider font-thin text-gray-200 cursor-default
                    items-center gap-1 mt-1 hidden md:flex">
                <p>Scroll to close</p>
                <PiMouseScrollThin size={15} />
            </span>
        </div>
    );
}

SimplePhotoViewer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    photo: PropTypes.string.isRequired,
    caption: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    date: PropTypes.string,
    itemsInPhoto: PropTypes.arrayOf(PropTypes.string)
};

export default SimplePhotoViewer