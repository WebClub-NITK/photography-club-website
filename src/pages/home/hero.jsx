import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FiCamera } from "react-icons/fi";
import { MdOutlineOpenInNew } from "react-icons/md";
import ScrollView from "./ScrollView";
import { useRef, useState } from "react";
import { Link } from "react-router";

function Hero({ photos }) {
    const scrollContainerRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <div className="flex flex-col gap-4 py-10">
            <Link to="/photo-reels">
                <p className="flex flex-row items-center gap-2 pt-3 
                    font-bold text-[14px] text-tertiary uppercase">
                    <p>Top Rated on <u>Photo Reels</u></p>
                    <MdOutlineOpenInNew size={20} />
                </p>
            </Link>
            <p className="font-playfair font-medium text-[48px] leading-[1.1] text-primary">
                Captured by us, celebrated by all.
            </p>
            <div className="flex flex-col items-start gap-4 pt-2 md:flex-row-reverse">
                {/* Photo Slider */}
                <div
                    className="overflow-x-hidden overflow-y-hidden"
                    ref={scrollContainerRef}
                >
                    <div className="flex flex-row items-start gap-5">
                        {photos.map((image, index) => (
                            <img
                                src={image.image}
                                alt="club-gallery"
                                key={index}
                                className="w-full max-h-[450px] rounded-[8px] object-contain"
                            />
                        ))}
                    </div>
                </div>
                {/* Photo Info */}
                <div className="flex flex-col gap-4 pt-2 md:w-[300px]">
                    <div>
                        <p className="font-playfair font-medium text-[16px] leading-[1.2] 
                            text-primary italic">
                            {photos[currentImageIndex].title}
                        </p>
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
                    </div>
                    <ScrollView
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
    )
}

export default Hero
