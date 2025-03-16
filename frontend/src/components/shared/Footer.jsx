import { Link } from "react-router-dom";
import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Left Section: Branding */}
          <div>
            <Link to="/">
              <h1 className="text-3xl font-bold">
                Job<span className="text-[#F83002]">Portal</span>
              </h1>
            </Link>
            <p className="text-gray-400 mt-2 text-sm">
              Connecting job seekers with top opportunities.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              © {new Date().getFullYear()} JobPortal. All rights reserved.
            </p>
          </div>

          {/* Center Section: Quick Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="text-gray-400 space-y-1">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Browse" className="hover:text-white">
                  Browse
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-white">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section: Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold">
              Subscribe to our Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="mt-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 text-gray-900 rounded-l-md w-2/3 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-[#F83002] text-white px-4 py-2 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-400 text-sm mt-2">
              Stay updated with the latest job listings.
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-10 border-t border-gray-700 pt-6">
          <p className="text-gray-500 text-sm text-center md:text-left">
            Designed by{" "}
            <span className="text-white font-semibold">Shubham Chaudhary</span>
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/shubham-chaudhary-react"
              target="_blank"
              className="text-gray-400 hover:text-blue-500 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-10 h-10" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/ShubhamChaudhary26"
              target="_blank"
              className="text-gray-400 hover:text-white transition"
              aria-label="GitHub"
            >
              <FaGithub className="w-10 h-10" />
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/7777909218"
              target="_blank"
              className="text-gray-400 hover:text-green-500 transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-10 h-10" />
            </a>
            {/*insta */}
            <a
              href="https://www.instagram.com/shubh26____/"
              target="_blank"
              className="text-gray-400 hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <FaInstagram className="w-10 h-10" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
