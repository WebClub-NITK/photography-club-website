import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FiCamera } from "react-icons/fi";
import { MdOutlineOpenInNew } from "react-icons/md";
import ManualScroll from "./ManualScroll";
import { useRef, useState } from "react";
import { Link } from "react-router";

function Hero({ photos }) {
    const scrollContainerRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;

        // Get all image elements
        const images = container.getElementsByTagName('img');
        if (images.length === 0) return;

        // Get the container's left position
        const containerLeft = container.getBoundingClientRect().left;
        const containerCenter = containerLeft + (container.clientWidth / 2);

        // Find the image closest to the center
        let closestImage = 0;
        let minDistance = Infinity;

        Array.from(images).forEach((img, index) => {
            const imgRect = img.getBoundingClientRect();
            const imgCenter = imgRect.left + (imgRect.width / 2);
            const distance = Math.abs(containerCenter - imgCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestImage = index;
            }
        });

        setCurrentImageIndex(closestImage);
    };

    const scrollTo = (direction) => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollAmount = container.clientWidth;
        container.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <div className="py-10 flex flex-col gap-4">
            <Link to="/photo-reels">
                <p className="pt-3 text-tertiary uppercase text-[14px] font-bold flex flex-row gap-2 items-center">
                    <p>Top Rated on <u>Photo Reels</u></p> <MdOutlineOpenInNew size={20} />
                </p>
            </Link>
            <p className="text-primary text-[48px] leading-[1.1] font-medium font-playfair">
                Captured by us, celebrated by all.
            </p>
            <div className="pt-5 flex flex-col gap-4 items-start md:flex-row-reverse">
                {/* Photo Slider */}
                <div
                    className="overflow-x-auto overflow-y-hidden"
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                >
                    <div className="flex flex-row gap-5 items-start">
                        {photos.map((image, index) => (
                            <img
                                src={image.image}
                                alt="club-gallery"
                                key={index}
                                className="w-full max-h-[450px] object-contain rounded-[8px]"
                            />
                        ))}
                    </div>
                </div>
                {/* Photo Info */}
                <div className="pt-5 flex flex-col gap-4 md:w-[300px]">
                    <div>
                        <p className="text-primary text-[16px] leading-[1.2] italic font-medium font-playfair">
                            {photos[currentImageIndex].title}
                        </p>
                        <div className="py-7 flex flex-col gap-4">
                            <p className="text-primary flex flex-row gap-3 items-center">
                                <IoLocationOutline size={20} />
                                <p>{photos[currentImageIndex].location}</p>
                            </p>
                            <p className="text-primary flex flex-row gap-3 items-center">
                                <SlCalender size={20} />
                                <p>{photos[currentImageIndex].date}</p>
                            </p>
                            <p className="text-primary flex flex-row gap-3 items-center">
                                <FiCamera size={20} />
                                <p>{photos[currentImageIndex].photographer}</p>
                            </p>
                            <Link to={photos[currentImageIndex].link}>
                                <p className="text-primary flex flex-row gap-3 items-center underline">
                                    <MdOutlineOpenInNew size={20} />
                                    <p>Open Photo</p>
                                </p>
                            </Link>

                        </div>
                    </div>
                    <ManualScroll onScroll={scrollTo} currentIndex={currentImageIndex} totalImages={photos.length} />
                </div>
            </div>
        </div>
    )
}

export default Hero
