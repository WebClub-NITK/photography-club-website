import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FiCamera } from "react-icons/fi";
import { MdOutlineOpenInNew } from "react-icons/md";
import ScrollView from "../../components/util/ScrollView";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function Hero({ photos }) {
    const scrollContainerRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const handlePhotoReelsClick = () => {
        window.scrollTo(0, 0);
        navigate('/photo-reels');
    };

    return (
        <div className="flex flex-col py-10">
            <div onClick={handlePhotoReelsClick} className="cursor-pointer">
                <p className="flex flex-row items-center gap-2 pt-3 
                    font-bold text-[14px] text-tertiary uppercase">
                    <p>Top Rated on <u>Photo Reels</u></p>
                    <MdOutlineOpenInNew size={20} />
                </p>
            </div>
            <p className="font-playfair font-medium text-[48px] leading-[1.1] text-primary md:py-2">
                Captured by us, celebrated by all.
            </p>
            <div className="flex flex-col items-start gap-4 pt-4 md:flex-row-reverse">
                {/* Photo Slider */}
                <div className="relative overflow-visible">
                    <div
                        className="overflow-x-hidden overflow-y-hidden"
                        ref={scrollContainerRef}
                    >
                        <div className="flex flex-row items-start gap-5 overflow-visible">
                            {photos.map((image, index) => (
                                <img
                                    src={image.image}
                                    alt="club-gallery"
                                    key={index}
                                    className={`overflow-visible w-full max-h-[300px] md:max-h-[400px] lg:max-h-[800px] rounded-[8px] object-contain transition-all duration-100 ease-in
                                    ${index == currentImageIndex ? "brightness-100" : "brightness-80 grayscale-[0.5]"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Photo Info */}
                <div className="flex flex-col gap-4 pt-2 justify-between md:min-w-[180px] lg:min-w-[220px]">
                    <div>
                        <p className="font-playfair font-medium text-[16px] leading-[1.2] 
                            text-primary italic tracking-wide">
                            {photos[currentImageIndex].title}
                        </p>
                    </div>
                    <div>
                        <div className="flex flex-col gap-4 py-4">
                            <p className="flex flex-row items-center gap-3 text-primary">
                                <IoLocationOutline size={20} />
                                <p>{photos[currentImageIndex].location}</p>
                            </p>
                            <p className="flex flex-row items-center gap-3 text-primary">
                                <SlCalender size={20} />
                                <p>{photos[currentImageIndex].date}</p>
                            </p>
                            <p className="flex flex-row items-center gap-3 text-primary">
                                <FiCamera size={20} />
                                <p>{photos[currentImageIndex].photographer}</p>
                            </p>
                            <Link to={photos[currentImageIndex].link}>
                                <p className="flex flex-row items-center gap-3 text-primary underline">
                                    <MdOutlineOpenInNew size={20} />
                                    <p>Open Photo</p>
                                </p>
                            </Link>
                        </div>
                        <ScrollView
                            speed={1.5}
                            currentIndex={currentImageIndex}
                            setCurrentIndex={setCurrentImageIndex}
                            totalImages={photos.length}
                            scrollType="single"
                            containerRef={scrollContainerRef}
                            centerCalculation={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

Hero.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        photographer: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
    })).isRequired,
}

export default Hero
