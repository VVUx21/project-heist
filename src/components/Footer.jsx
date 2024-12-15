import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-gray-300 rounded-t-3xl overflow-hidden">
      <div
        className="relative bg-[#212121] text-white pt-16 pb-8 px-5 md:px-16 lg:px-32"
        style={{
          clipPath: "ellipse(150% 100% at 50% 0%)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/ecell logo.svg" alt="E-Cell Logo" className="h-5" />
              <span className="font-semibold font-editorial text-[25px] whitespace-nowrap">
                | Entrepreneurship Cell
              </span>
            </div>
            <div className="flex space-x-4 mb-4 mt-4">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-blue-500 text-2xl"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-500 text-2xl"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-700 text-2xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-blue-300 text-2xl"
              >
                <FaLinkedin />
              </a>
            </div>
            <hr className="border-t border-[#D9D9D9]" />
            <p className="text-sm mb-4 mt-4">
              Founded in 2007, Entrepreneurship Cell NIT Rourkela fosters
              &quot;Innovation, Incubation, and Entrepreneurship&quot;. It
              empowers students with entrepreneurial traits and supports them in
              turning ideas into ventures.
            </p>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-2 gap-x-20">
            <div>
              <h2 className="text-lg font-semibold mb-4">MENU</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Past Speakers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Past Sponsors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Investors
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">PAGES</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Event
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">CONTACT US</h2>
            <div className="mb-2 flex items-center space-x-2">
              <img
                src="/svg-1085277172_900.svg"
                alt="Email Icon"
                className="h-7 w-5"
              />

              <div>
                <p className="text-white font-semibold">Email</p>
                <p className="text-gray-400 hover:underline">
                  contact@meagency.io
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="/svg1227145397_533.svg"
                alt="Phone Icon"
                className="h-7 w-5"
              />
              {/* <span>(+44) 7522 - 507979</span> */}
              <div>
                <p className="text-white font-semibold">Phone</p>
                <p className="text-gray-400 hover:underline">
                  (+44) 7522 - 507979
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}

      <div className="bg-[#212121] py-4 text-sm text-gray-400">
        <hr className="border-t border-[#D9D9D9] mb-4" />

        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-32 space-y-4 md:space-y-0">
          <p className="text-center md:text-left">
            @National Entrepreneurship Summit (NES)
          </p>
          <div className="flex justify-center items-center space-x-4">
            <img src="/nit.png" alt="NIT Logo" className="h-12 w-auto" />
            <img src="/Group.svg" alt="NES Logo" className="h-8 w-auto" />
            <img
              src="/ecell logo.svg"
              alt="E-Cell Logo"
              className="h-5 w-auto"
            />
          </div>
        </div>
      </div>
      {/* Small Strip Below Footer */}
      <div className="bg-black text-white flex justify-center items-center">
        <p className="text-sm sm:text-base whitespace-nowrap">
          Made with <span className="text-blue-400">❤️</span> by
          <a
            href="https://www.instagram.com/webwiz.nitr/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-white hover:text-red-300 transition-colors duration-200"
          >
            WEBWIZ
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
