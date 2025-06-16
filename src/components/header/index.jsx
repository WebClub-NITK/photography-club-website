import { Link, useNavigate } from "react-router"
import logo from "../../assets/images/temp-logo.png"
import { FiCamera } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext"
import Button from "../Button"
import { navigateSmooth } from "../../utils/helperFunctions"

const navigationLinks = [
    {
        path: '/events',
        label: 'Events',
        icon: null
    },
    {
        path: '/portfolio',
        label: 'Members',
        icon: null
    },
    {
        path: '/blogs',
        label: 'Blogs',
        icon: null
    },
    {
        path: '/photo-reels',
        label: 'Photo Reel',
        icon: <FiCamera size={18} />,
        isButton: true,
        variant: 'outline'
    },
    {
        path: '/club-member',
        label: 'Club Member',
        icon: <FaRegUser size={16} />,
        isButton: true,
        variant: 'secondary'
    }
]

export default function Header() {
    const [nav, setNav] = useState(false)
    const { theme } = useTheme()
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)




    const navigate = useNavigate()

    const handleNav = () => {
        setNav(!nav)
    }

    const handleNavigation = (path) => {
        handleNav()
        navigateSmooth(navigate, path)
    }

    return (
        <>
            <header className="z-10 fixed top-0 left-0 right-0 h-[70px] bg-white/80 backdrop-blur-2xl border-b border-gray-200 flex justify-between items-center px-container-px md:px-container-px-md">
                <Link to="/" onClick={() => navigateSmooth(navigate, '/', 'header')}>
                    <img
                        src={logo}
                        alt="Photography Club NITK"
                        className={`w-[50px] ${theme === 'light' ? 'invert' : ''}`}
                    />
                </Link>
                <div className="hidden md:flex items-center justify-center gap-8 text-sm tracking-wide">
                    {navigationLinks.slice(0, -1).map((link) => (
                        link.isButton ? (
                            <Link key={link.path} to={link.path} onClick={() => navigateSmooth(navigate, link.path, 'header')}>
                                <Button variant={link.variant} size="sm" icon={link.icon}>
                                    {link.label}
                                </Button>
                            </Link>
                        ) : (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                onClick={() => navigateSmooth(navigate, link.path, 'header')}
                                className="hover:text-red-500 transition-colors"
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                </div>
                <div onClick={handleNav} className='block md:hidden'>
                    <AiOutlineMenu size={20} />
                </div>

                {/* { isLoggedIn ? 
                    <div className="hidden md:block">
                        <Button variant="secondary" size="sm" icon={<FaRegUser />}>
                            Club Member
                        </Button>
                    </div>  : <div></div>
                } */}
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
                        {navigationLinks.map((link, index) => (
                            <div key={link.path}>
                                <Link 
                                    onClick={() => handleNavigation(link.path)}
                                    to={link.path} 
                                    className="hover:text-red-500 transition-colors"
                                >
                                    {link.icon ? (
                                        <div className="flex items-center gap-2">
                                            {link.icon}
                                            <span>{link.label}</span>
                                        </div>
                                    ) : (
                                        link.label
                                    )}
                                </Link>
                                {[2, 3].includes(index) && <hr className="border-gray-100" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}