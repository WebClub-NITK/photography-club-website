import { IoIosArrowDown } from 'react-icons/io'

function ScrollDown() {
    return (
        <div className="absolute bottom-0 left-0 w-full h-[100px] flex items-center justify-center md:hidden"
            onClick={() => {
                const targetHeight = document.querySelector('.max-w-container').offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetHeight - 50 - startPosition;
                const duration = 300;
                let start = null;

                const smoothScroll = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const progressPercentage = Math.min(progress / duration, 1);
                    window.scrollTo(0, startPosition + distance * progressPercentage);
                    if (progress < duration) {
                        window.requestAnimationFrame(smoothScroll);
                    }
                };

                window.requestAnimationFrame(smoothScroll);
            }}
        >
            <span className="text-black text-sm md:text-base font-medium">Scroll down</span> <IoIosArrowDown className="w-5 h-5" />
        </div>
    )
}

export default ScrollDown