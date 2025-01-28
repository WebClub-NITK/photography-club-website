import { Link } from "react-router"
import { FiCamera, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi"

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2">
                            <FiCamera size={24} />
                            <span className="font-playfair text-xl">Photography Club NITK</span>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                            Capturing moments, creating memories, and fostering a community of passionate photographers.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="font-medium mb-4">Quick Links</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <Link to="/" className="hover:text-red-500 transition-colors">Events</Link>
                            <Link to="/portfolio" className="hover:text-red-500 transition-colors">Members</Link>
                            <Link to="/" className="hover:text-red-500 transition-colors">Blogs</Link>
                            <Link to="/photo-reels" className="hover:text-red-500 transition-colors">Photo Reel</Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="col-span-1">
                        <h3 className="font-medium mb-4">Resources</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <Link to="/" className="hover:text-red-500 transition-colors">Photography Tips</Link>
                            <Link to="/" className="hover:text-red-500 transition-colors">Equipment Guide</Link>
                            <Link to="/" className="hover:text-red-500 transition-colors">Join the Club</Link>
                            <Link to="/" className="hover:text-red-500 transition-colors">Contact Us</Link>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="col-span-1">
                        <h3 className="font-medium mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                                <FiInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                                <FiTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-red-500 transition-colors">
                                <FiYoutube size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-center text-sm text-gray-600">
                        © {new Date().getFullYear()} Photography Club NITK. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}