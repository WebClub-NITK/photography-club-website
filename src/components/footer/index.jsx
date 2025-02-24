import { useNavigate } from "react-router";
import { FiCamera, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { navigateSmooth } from "../../utils/helperFunctions";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigateSmooth(navigate, path);
  };

  const quickLinks = [
    { name: "Events", path: "/events" },
    { name: "Members", path: "/portfolio" },
    { name: "Blogs", path: "/blogs" },
    { name: "Photo Reel", path: "/photo-reels" },
  ];

  const resourceLinks = [
    { name: "Photography Tips", path: "/" },
    { name: "Equipment Guide", path: "/" },
    { name: "Join the Club", path: "/" },
    { name: "Contact Us", path: "/" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2">
              <FiCamera size={24} />
              <span className="font-playfair text-xl">
                Photography Club NITK
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Capturing moments, creating memories, and fostering a community of
              passionate photographers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-medium mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(link.path)}
                  className="text-left hover:text-red-500 transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-medium mb-4">Resources</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {resourceLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(link.path)}
                  className="text-left hover:text-red-500 transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h3 className="font-medium mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                <FiYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col gap-4">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Photography Club NITK. All rights
            reserved.
          </p>
          <p className="text-center text-sm text-gray-600">
              Made with 💙 by <a className="underline text-blue-600" href="https://webclub.nitk.ac.in" target="_blank" rel="noopener noreferrer">Web Enthusiasts&apos; Club NITK</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
