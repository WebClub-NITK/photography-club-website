import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";

function ScrollView({
  speed = 1,
  currentIndex,
  setCurrentIndex,
  totalImages,
  scrollType = "view",
  containerRef,
  imageWidth = 200,
  imageGap = 16,
  centerCalculation = false,
  showSlideNumbers = true,
  autoScroll = false,
  autoScrollInterval = 4000,
}) {
  const [maxScrollPosition, setMaxScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const isAnimating = useRef(false);
  const autoScrollTimeoutRef = useRef(null);

  const calculateImagesPerView = useCallback(
    (container) => {
      if (!container) return 1;
      if (scrollType === "single") return 1;

      const containerWidth = container.clientWidth;
      const imageWidthWithGap = imageWidth + imageGap;
      return Math.floor(containerWidth / imageWidthWithGap);
    },
    [scrollType, imageWidth, imageGap]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const calculateMaxPosition = () => {
      if (scrollType === "single") {
        setMaxScrollPosition(totalImages - 1);
      } else {
        const imagesPerView = calculateImagesPerView(containerRef.current);
        setMaxScrollPosition(
          Math.max(0, Math.ceil(totalImages / imagesPerView) - 1)
        );
      }
    };

    calculateMaxPosition();

    const resizeObserver = new ResizeObserver(calculateMaxPosition);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [containerRef, scrollType, totalImages, calculateImagesPerView]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateCurrentIndex = () => {
      if (!containerRef.current) return 0;
      const container = containerRef.current;

      if (scrollType === "single" && centerCalculation) {
        const images = container.getElementsByTagName("img");
        if (images.length === 0) return 0;

        const containerLeft = container.getBoundingClientRect().left;
        const containerCenter = containerLeft + container.clientWidth / 2;

        let closestImage = 0;
        let minDistance = Infinity;

        Array.from(images).forEach((img, index) => {
          const imgRect = img.getBoundingClientRect();
          const imgCenter = imgRect.left + imgRect.width / 2;
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

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [
    containerRef,
    scrollType,
    setCurrentIndex,
    centerCalculation,
    totalImages,
    imageWidth,
    imageGap,
    calculateImagesPerView,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animateScroll = (container, targetScroll) => {
    // Clear any active auto-scroll timeout
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }

    const startScroll = container.scrollLeft;
    const distance = targetScroll - startScroll;
    const duration = Math.abs(distance * 1 * (1 / speed));
    const startTime = performance.now();

    setIsScrolling(true);
    isAnimating.current = true;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = easeOutCubic(progress);
      container.scrollLeft = startScroll + distance * eased;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsScrolling(false);
        isAnimating.current = false;

        // Resume auto-scroll after manual navigation
        if (autoScroll) {
          scheduleNextAutoScroll();
        }
      }
    };

    requestAnimationFrame(animate);
  };

  const scrollTo = useCallback(
    (direction) => {
      if (isScrolling || isAnimating.current) return;

      if (!containerRef.current) return;
      const container = containerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (scrollType === "single") {
        const images = container.getElementsByTagName("img");
        if (images.length === 0) return;

        let nextIndex;
        if (direction === "next") {
          nextIndex = (currentIndex + 1) % totalImages; // Loop back to beginning
        } else {
          nextIndex = currentIndex - 1 < 0 ? totalImages - 1 : currentIndex - 1; // Loop to end
        }

        const targetImage = images[nextIndex];
        if (!targetImage) return;

        const targetScroll = targetImage.offsetLeft - container.offsetLeft;
        animateScroll(
          container,
          Math.min(maxScroll, Math.max(0, targetScroll))
        );
      } else {
        if (direction === "prev" && currentIndex === 1) {
          animateScroll(container, 0);
          return;
        }

        const maxPosition =
          Math.ceil(totalImages / calculateImagesPerView(container)) - 1;
        if (direction === "next" && currentIndex === maxPosition - 1) {
          animateScroll(container, maxScroll);
          return;
        }

        const scrollAmount =
          container.clientWidth * (direction === "next" ? 1 : -1);
        const targetScroll = container.scrollLeft + scrollAmount;
        animateScroll(container, targetScroll);
      }
    },
    [
      isScrolling,
      containerRef,
      scrollType,
      animateScroll,
      currentIndex,
      totalImages,
      calculateImagesPerView,
    ]
  );

  // Auto scroll functionality
  const scheduleNextAutoScroll = useCallback(() => {
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }

    autoScrollTimeoutRef.current = setTimeout(() => {
      scrollTo("next");
    }, autoScrollInterval);
  }, [scrollTo, autoScrollInterval]);

  // Start/stop auto scrolling based on the autoScroll prop
  useEffect(() => {
    if (!autoScroll) {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
      return;
    }

    scheduleNextAutoScroll();

    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, [autoScroll, scheduleNextAutoScroll, currentIndex]);

  const progress =
    currentIndex >= maxScrollPosition
      ? `${maxScrollPosition + 1}/${maxScrollPosition + 1}`
      : `${currentIndex + 1}/${maxScrollPosition + 1}`;

  const buttonClass = `
        cursor-pointer
        w-[32px] h-[32px] flex items-center justify-center 
        text-complementPrimary text-[14px] 
        rounded-full 
        transition-all duration-100
        active:-translate-y-1`;

  return (
    <div className="flex flex-row gap-3 items-center">
      <button
        onClick={() => scrollTo("prev")}
        disabled={isScrolling}
        className={`${buttonClass} 
                ${
                  isScrolling
                    ? "bg-secondary"
                    : "bg-tertiary \
                        hover:border-[rgba(100,100,100,0.5)] \
                        hover:border-[4px]"
                }`}
      >
        <IoIosArrowBack size={16} />
      </button>
      {showSlideNumbers && (
        <span className="text-tertiary text-[14px] font-bold uppercase">
          {progress}
        </span>
      )}
      <button
        onClick={() => scrollTo("next")}
        disabled={isScrolling}
        className={`${buttonClass} 
                ${
                  isScrolling
                    ? "bg-secondary"
                    : "bg-tertiary \
                        hover:border-[rgba(100,100,100,0.5)] \
                        hover:border-[4px]"
                }`}
      >
        <IoIosArrowForward size={16} />
      </button>
    </div>
  );
}

ScrollView.propTypes = {
  // Required props
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  totalImages: PropTypes.number.isRequired,
  containerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,

  // Optional props with defaults
  speed: PropTypes.number,
  scrollType: PropTypes.oneOf(["single", "view"]),
  imageWidth: PropTypes.number,
  imageGap: PropTypes.number,
  centerCalculation: PropTypes.bool,
  showSlideNumbers: PropTypes.bool,
  autoScroll: PropTypes.bool,
  autoScrollInterval: PropTypes.number,
};

ScrollView.defaultProps = {
  speed: 1,
  scrollType: "view",
  imageWidth: 200,
  imageGap: 16,
  centerCalculation: false,
  autoScroll: false,
  autoScrollInterval: 4000,
};

export default ScrollView;
