import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useCallback } from "react";
import PropTypes from 'prop-types';

function ScrollView({
    currentIndex,
    setCurrentIndex,
    totalImages,
    scrollType = "view",
    containerRef,
    imageWidth = 200,
    imageGap = 16,
    centerCalculation = false,
}) {
    const calculateImagesPerView = useCallback((container) => {
        if (!container) return 1;
        if (scrollType === "single") return 1;

        const containerWidth = container.clientWidth;
        const imageWidthWithGap = imageWidth + imageGap;
        return Math.floor(containerWidth / imageWidthWithGap);
    }, [scrollType, imageWidth, imageGap]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const calculateCurrentIndex = () => {
            if (!containerRef.current) return 0;
            const container = containerRef.current;

            if (scrollType === "single" && centerCalculation) {
                const images = container.getElementsByTagName('img');
                if (images.length === 0) return 0;

                const containerLeft = container.getBoundingClientRect().left;
                const containerCenter = containerLeft + (container.clientWidth / 2);

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
                return closestImage;
            } else {
                const scrollLeft = container.scrollLeft;
                const maxScroll = container.scrollWidth - container.clientWidth;

                if (scrollLeft < 1) return 0;

                if (Math.abs(scrollLeft - maxScroll) < 1) {
                    return Math.ceil(totalImages / calculateImagesPerView(container)) - 1;
                }

                const widthWithGap = imageWidth + imageGap;
                return Math.round(scrollLeft / widthWithGap);
            }
        };

        const handleScroll = () => {
            const newIndex = calculateCurrentIndex();
            setCurrentIndex(newIndex);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [containerRef, scrollType, setCurrentIndex, centerCalculation, totalImages, imageWidth, imageGap, calculateImagesPerView]);

    const animateScroll = (container, targetScroll) => {
        const startScroll = container.scrollLeft;
        const distance = targetScroll - startScroll;
        const duration = Math.abs(distance * 1); // Animation duration in ms
        const startTime = performance.now();

        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3); // Smooth easing function

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const eased = easeOutCubic(progress);
            container.scrollLeft = startScroll + (distance * eased);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const scrollTo = (direction) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (scrollType === "single") {
            // Get the first image to use its width
            const images = container.getElementsByTagName('img');
            if (images.length === 0) return;

            const firstImage = images[0];
            const imageRect = firstImage.getBoundingClientRect();
            const singleImageWidth = imageRect.width;

            // Scroll by single image width + gap
            const scrollAmount = direction === 'next'
                ? singleImageWidth + 20  // 20px is the gap
                : -(singleImageWidth + 20);

            const targetScroll = container.scrollLeft + scrollAmount;
            animateScroll(container, Math.min(maxScroll, Math.max(0, targetScroll)));
        } else {
            // Gallery-style view scroll with snap
            if (direction === 'prev' && currentIndex === 1) {
                animateScroll(container, 0);
                return;
            }

            const maxPosition = Math.ceil(totalImages / calculateImagesPerView(container)) - 1;
            if (direction === 'next' && currentIndex === maxPosition - 1) {
                animateScroll(container, maxScroll);
                return;
            }

            const scrollAmount = (imageWidth + imageGap) * (direction === 'next' ? 1 : -1);
            const targetScroll = container.scrollLeft + scrollAmount;
            animateScroll(container, targetScroll);
        }
    };

    // Calculate max scroll position based on type
    const maxScrollPosition = scrollType === "single"
        ? totalImages - 1
        : Math.max(0, Math.ceil(totalImages / calculateImagesPerView(containerRef.current)) - 1);

    const progress = currentIndex >= maxScrollPosition
        ? `${maxScrollPosition + 1}/${maxScrollPosition + 1}`
        : `${currentIndex + 1}/${maxScrollPosition + 1}`;

    return (
        <div className="flex flex-row gap-3">
            <button
                onClick={() => scrollTo('prev')}
                disabled={currentIndex === 0}
                className={`w-[25px] h-[25px] flex items-center justify-center text-complementPrimary text-[14px] ${currentIndex === 0 ? 'bg-secondary' : 'bg-tertiary'} rounded-full`}
            >
                <IoIosArrowBack size={16} />
            </button>
            <span className="text-tertiary text-[14px] font-bold uppercase">
                {progress}
            </span>
            <button
                onClick={() => scrollTo('next')}
                disabled={currentIndex >= maxScrollPosition}
                className={`w-[25px] h-[25px] flex items-center justify-center text-complementPrimary text-[14px] ${currentIndex >= maxScrollPosition ? 'bg-secondary' : 'bg-tertiary'} rounded-full`}
            >
                <IoIosArrowForward size={16} />
            </button>
        </div>
    )
}

ScrollView.propTypes = {
    // Required props
    currentIndex: PropTypes.number.isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
    totalImages: PropTypes.number.isRequired,
    containerRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }).isRequired,

    // Optional props with defaults
    scrollType: PropTypes.oneOf(['single', 'view']),
    imageWidth: PropTypes.number,
    imageGap: PropTypes.number,
    centerCalculation: PropTypes.bool,
};

ScrollView.defaultProps = {
    scrollType: 'view',
    imageWidth: 200,
    imageGap: 16,
    centerCalculation: false,
};

export default ScrollView