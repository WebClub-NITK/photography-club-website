import { ReactTyped } from "react-typed";
import { FiCamera } from "react-icons/fi";
import Button from "../../components/Button";
import landingImg from "../../assets/images/landing.png";
import PropTypes from 'prop-types';

function Landing({ onJoin, specialNotices }) {
    return (
        <div className="relative h-[calc(100vh-65px)]">
            <img src={landingImg} alt="landing" className="w-full h-full object-cover absolute inset-0" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-container-px md:px-container-px-md">
                <h1 className="text-black text-[40px] md:text-[60px] font-light text-center leading-[1.1]">
                    The best place to <span className="text-red-500 font-playfair italic">Focus</span> on<br />your <span className="text-red-500 font-playfair italic">Craft</span>
                </h1>
                <p className="pt-6 px-4 max-w-[500px] text-center text-black text-base md:text-lg font-light">
                    A community at NITK where you can show the world from your perspective.
                </p>
                <div className="mt-10">
                    <Button
                        onClick={onJoin}
                        icon={<FiCamera className="w-5 h-5" />}
                        variant="primary"
                        size="lg"
                        className="rounded-full min-w-[200px] bg-black text-white hover:bg-black/90"
                    >
                        Join the community
                    </Button>
                </div>
                <div className="mt-8">
                    <ReactTyped
                        strings={specialNotices}
                        typeSpeed={50}
                        backSpeed={50}
                        loop
                        className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm text-black text-sm md:text-base font-medium"
                    />
                </div>
            </div>
        </div>
    )
}

Landing.propTypes = {
    onJoin: PropTypes.func.isRequired,
    specialNotices: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Landing