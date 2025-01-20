import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-gray-300 rounded-t-3xl overflow-hidden">
      <div
        className="relative bg-[#212121] text-white pt-16 pb-8 px-5 md:px-16 lg:px-10"
        style={{
          clipPath: "ellipse(150% 100% at 50% 0%)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-1/3 xl:pl-24">
          {/* Left Section */}
          <div>
            <div className="flex flex-col xl:flex-row items-center space-x-2 mb-4">
              <img src="/ecell logo.svg" alt="E-Cell Logo" className="h-5" />
              <span className="font-semibold font-editorial text-[25px] whitespace-nowrap">
                Entrepreneurship Cell
              </span>
            </div>
            <div className="flex space-x-4 mb-4 mt-4 xl:justify-start justify-center">
              <a
                href="https://x.com/ecellnitr"
                aria-label="Twitter"
                className="hover:text-pink-500 text-2xl"
                target="blank"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/ecell_nitrourkela?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                aria-label="Instagram"
                className="hover:text-pink-500 text-2xl"
                target="blank"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/ECellNITR/?fref=ts"
                aria-label="Facebook"
                className="hover:text-pink-500 text-2xl"
                target="blank"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/company/entrepreneurship-cell-nit-rourkela"
                aria-label="LinkedIn"
                className="hover:text-pink-500 text-2xl"
                target="blank"
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
          <div className="sm:block hidden ml-4">
            <div className="flex justify-around mb-4">
              <div>
                <h2 className="text-lg font-semibold mb-4 md:mr-10">MENU</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#About Us" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#Events" className="hover:underline">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="#Speakers" className="hover:underline">
                      Past Speakers
                    </a>
                  </li>
                  <li>
                    <a href="#Sponsors" className="hover:underline">
                      Past Sponsors
                    </a>
                  </li>
                  <li>
                    <a href="#Investors" className="hover:underline">
                      Investors
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-7">
              <div className="sm:block hidden">
                <h2 className="text-lg font-semibold mb-4">PAGES</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Event
                    </a>
                  </li>
                </ul>
              </div>  
              <div className="sm:block hidden">
                <h2 className="text-lg font-semibold mb-4">BROCHURES</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="https://drive.google.com/file/d/16eYXo6FosoxC-kUpzNsqkvyj9T7HB4Zk/view?usp=drivesdk" className="hover:underline">
                      Guest Lecture
                    </a>
                  </li>
                  <li>
                    <a href="https://drive.google.com/file/d/12VvSNvT-RqOV1JzozY5LOuxzoTF0rSse/view?usp=drivesdk" className="hover:underline">
                      Startup Expo
                    </a>
                  </li>
                  <li>
                    <a href="https://drive.google.com/file/d/1WgQUrUpfK738wxHA-F4Lbs65IEHIdHZF/view?usp=drivesdk" className="hover:underline">
                    Sponsorship Brochure
                    </a>
                  </li>
                </ul>
              </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="min-w-1/4">
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
                  nes@ecellnitrkl.in
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
              <div className="">
                <p className="text-white font-semibold">Phone</p>
                <p className="text-gray-400 hover:underline">+91 9937241286 (Soyanshu Sahoo)</p>
                <p className="text-gray-400 hover:underline">+91 74991 56661 (Aditya Chauhan)</p>
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
