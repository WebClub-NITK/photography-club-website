import ManualScroll from './ManualScroll'
import { useState, useRef } from 'react'


function About({ clubGallery, stats }) {
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
    const galleryRef = useRef(null);

    const handleGalleryScroll = () => {
        if (!galleryRef.current) return;

        const container = galleryRef.current;
        const scrollLeft = container.scrollLeft;
        const imageWidth = 200 + 16; // image width (200px) + gap (16px)

        // Calculate which image is closest to the center
        const imageIndex = Math.round(scrollLeft / imageWidth);
        setCurrentGalleryIndex(Math.min(Math.max(0, imageIndex), clubGallery.length - 1));
    };

    const scrollGallery = (direction) => {
        if (!galleryRef.current) return;

        const container = galleryRef.current;
        const scrollAmount = 200 + 16; // image width + gap
        container.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            <p className="pt-3 text-tertiary uppercase text-[14px] font-bold">
                About Us
            </p>
            <p className="py-2 text-primary text-[48px] leading-[1] font-medium font-playfair">
                The magic of moments, <br /> preserved in pixels.
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                <p className="py-4 text-primary 
                text-[18px] leading-[1.5] font-light
                md:max-w-[60%]
                ">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    <br /><br />
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief
                </p>
                <div className="flex flex-col gap-2 text-primary">
                    {stats.map((value, index) => (
                        <div key={index} className="flex gap-2 border-b border-secondary pb-2">
                            <span className="w-[40px] text-right text-xl font-bold ">{value.value}</span>
                            <span className="grow text-lg font-medium font-playfair italic">{value.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <button className="transition-all duration-200 
            w-[130px] bg-primary px-4 py-2 rounded-[8px] mt-10 md:mt-3
            text-complementPrimary text-[14px] 
            hover:bg-red-400 hover:drop-shadow-xl 
            focus:bg-red-400 focus:drop-shadow-xl">
                Learn More
            </button>
            <div className="pt-12 flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <p className="pt-3 text-tertiary uppercase text-[14px] font-bold">
                        Club Gallery
                    </p>
                    <ManualScroll
                        onScroll={scrollGallery}
                        currentIndex={currentGalleryIndex}
                        totalImages={clubGallery.length}
                    />
                </div>
                <div
                    className="overflow-x-auto overflow-y-hidden"
                    ref={galleryRef}
                    onScroll={handleGalleryScroll}
                >
                    <div className="flex flex-row gap-4 items-start">
                        {clubGallery.map((image, index) => (
                            <img
                                src={image}
                                alt="club-gallery"
                                key={index}
                                className="w-[200px] max-h-[250px] object-contain rounded-[8px]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default About