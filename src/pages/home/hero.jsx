import { GrLocation } from "react-icons/gr";
import { MdEvent } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
import { MdOutlineOpenInNew } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ScrollView from "../../components/util/ScrollView";
import { navigateSmooth } from "../../utils/helperFunctions";

function Hero({ photos }) {
    const scrollContainerRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const imageGap = 20; // Space between images

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % photos.length;

                if (scrollContainerRef.current) {
                    const scrollAmount = scrollContainerRef.current.clientWidth; // Ensure only one image is visible
                    scrollContainerRef.current.scrollTo({
                        left: nextIndex * scrollAmount,
                        behavior: "smooth",
                    });
                }

                return nextIndex;
            });
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, [photos.length]);

    const handlePhotoReelsClick = () => {
        navigateSmooth(navigate, "/photo-reels");
    };

    return (
        <div className="flex flex-col gap-4 py-10">
            <button
                onClick={handlePhotoReelsClick}
                className="flex flex-row items-center gap-2 pt-3 w-fit pr-4
                    font-bold text-[14px] text-tertiary uppercase"
            >
                <p>Top Rated on <u>Photo Reels</u></p>
                <MdOutlineOpenInNew size={20} />
            </button>
            <p className="font-playfair font-medium text-[48px] leading-[1.1] text-primary transition-opacity duration-1000">
                Captured by us, celebrated by all.
            </p>
            <div className="flex flex-col items-start gap-4 pt-2 md:flex-row-reverse">
                {/* Photo Slider */}
                <div
                    ref={scrollContainerRef}
                    className="md:flex-grow overflow-hidden w-full"
                    style={{ whiteSpace: "nowrap" }} // Prevent wrapping
                >
                    <div className="flex flex-row w-full transition-transform duration-1000 ease-in-out">
                        {photos.map((image, index) => (
                            <img
                                src={image.image}
                                alt="club-gallery"
                                key={index}
                                className="w-auto h-[300px] md:h-[450px] lg:h-[500px] 
                                rounded-[8px] md:rounded-[12px] object-contain mx-auto"
                                style={{
                                    minWidth: "100%", // Ensures only one image is visible
                                    maxWidth: "100%", 
                                    marginRight: `${imageGap}px`, // Space between images
                                }}
                            />
                        ))}
                    </div>
                </div>
                {/* Photo Info */}
                <div className="h-full flex flex-col justify-between gap-4 pt-2 md:min-w-[180px] lg:min-w-[250px]">
                    <div>
                        <p className="font-playfair font-medium text-[16px] leading-[1.2] 
                            md:text-[20px] md:py-5 lg:py-10 text-clip text-primary italic">
                            {photos[currentImageIndex]?.title}
                        </p>
                        <div className="flex flex-col gap-4 py-4">
                            <p className="flex flex-row items-center gap-3 text-primary">
                                <GrLocation size={20} />
                                <p>{photos[currentImageIndex]?.location}</p>
                            </p>
                            <p className="flex flex-row items-center gap-3 text-primary">
                                <MdEvent size={20} />
                                <p>{photos[currentImageIndex]?.date}</p>
                            </p>
                            <p className="flex flex-row items-center gap-3 text-primary">
                                <FiCamera size={20} />
                                <p>{photos[currentImageIndex]?.photographer}</p>
                            </p>
                            <Link to={photos[currentImageIndex]?.link}>
                                <p className="flex flex-row items-center gap-3 text-primary underline">
                                    <MdOutlineOpenInNew size={20} />
                                    <p>Open Photo</p>
                                </p>
                            </Link>
                             <ScrollView
                                currentIndex={currentImageIndex}
                                setCurrentIndex={setCurrentImageIndex}
                                totalImages={photos.length}
                                scrollType="single"
                                containerRef={scrollContainerRef}
                                centerCalculation={true}
                                imageGap={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Hero.propTypes = {
    photos: PropTypes.array.isRequired,
};

export default Hero;
