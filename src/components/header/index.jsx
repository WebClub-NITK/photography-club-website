import { Link, useNavigate } from "react-router"
import logo from "../../assets/images/temp-logo.png"
import { FiCamera } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext"
import Button from "../Button"

export default function Header() {
    const [nav, setNav] = useState(false)
    const { theme } = useTheme()
    const navigate = useNavigate()

    const handleNav = () => {
        setNav(!nav)
    }

    const navigateTo = (url) => {
        navigate(url)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            <header className="
                z-10
                fixed top-0 left-0 right-0
                h-[70px]
                bg-white/80 backdrop-blur-xl
                border-b border-gray-200
                flex justify-between items-center
                px-container-px md:px-container-px-md
            ">
                <Link to="/">
                    <img
                        src={logo}
                        alt="Photography Club NITK"
                        className={`w-[50px] ${theme === 'light' ? 'invert' : ''}`}
                    />
                </Link>
                <div className="hidden md:flex items-center justify-center gap-8 text-sm tracking-wide">
                    <Link to="/events" className="hover:text-red-500 transition-colors">
                        Events
                    </Link>
                    <Link to="/portfolio" className="hover:text-red-500 transition-colors">
                        Members
                    </Link>
                    <Link to="/blogs" className="hover:text-red-500 transition-colors">
                        Blogs
                    </Link>
                    <Link to="/photo-reels">
                        <Button variant="outline" size="sm" icon={<FiCamera />}>
                            Photo Reel
                        </Button>
                    </Link>
                </div>
                <div onClick={handleNav} className='block md:hidden'>
                    <AiOutlineMenu size={20} />
                </div>
                <div className="hidden md:block">
                    <Button variant="secondary" size="sm" icon={<FaRegUser />}>
                        Club Member
                    </Button>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`fixed ease-in duration-200 ${nav ? "z-20 left-0 top-0 w-[70%] h-screen bg-white/95 backdrop-blur-xl" : "left-[-100%]"}`}>
                <div className="px-container-px py-8 flex flex-col h-full">
                    <div className="flex justify-between items-center">
                        <img
                            src={logo}
                            alt="Photography Club NITK"
                            className={`w-[40px] ${theme === 'light' ? 'invert' : ''}`}
                        />
                        <div onClick={handleNav} className="cursor-pointer">
                            <AiOutlineClose size={20} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 mt-12'>
                        <Link onClick={handleNav} to="/events" className="hover:text-red-500 transition-colors">
                            Events
                        </Link>
                        <Link onClick={handleNav} to="/portfolio" className="hover:text-red-500 transition-colors">
                            Members
                        </Link>
                        <Link onClick={handleNav} to="/blogs" className="hover:text-red-500 transition-colors">
                            Blogs
                        </Link>
                        <hr className="border-gray-100" />
                        <Link onClick={handleNav} to="/photo-reels" className="hover:text-red-500 transition-colors">
                            <div className="flex items-center gap-2">
                                <FiCamera size={18} />
                                <span>Photo Reel</span>
                            </div>
                        </Link>
                        <hr className="border-gray-100" />
                        <div onClick={handleNav} className="flex items-center gap-2 hover:text-red-500 transition-colors">
                            <FaRegUser size={16} />
                            <span>Club Member</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}