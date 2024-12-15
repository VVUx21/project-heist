"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Group from "../../public/Group.svg";
import Right from "../../public/arrow_forward_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="m-0 p-0 w-full h-20 bg-black top-0 z-50 sticky opacity-95">
        <div className="flex flex-row justify-between w-full items-center p-6 md:pr-0 lg:pr-6">
          <Image src={Group} className="w-20 h-9" />
          <div
            className="flex flex-col md:hidden gap-1"
            onClick={() => setOpen(!open)}
          >
            <div
              className={`h-[0.2rem] w-7 bg-[#F40C3F] ${
                open ? "rotate-45 translate-y-0" : ""
              }`}
            />
            <div
              className={`h-[0.2rem] w-7 bg-[#F40C3F] ${
                open ? "-rotate-45 -translate-y-[0.388rem]" : ""
              }`}
            />
            <div
              className={`h-[0.2rem] w-7 bg-[#F40C3F] ${open ? "hidden" : ""}`}
            />
          </div>
          <div className="md:flex flex-row h-max lg:w-[85%] md:w-[90%] gap-6 items-center justify-end hidden font-poppins">
            <div className="hover:text-[#F40C3F] cursor-pointer xl:text-xl">
              Home
            </div>
            <div className="hover:text-[#F40C3F] cursor-pointer xl:text-xl">
              Events
            </div>
            <div className="hover:text-[#F40C3F] cursor-pointer xl:text-xl">
              About Us
            </div>
            <div className="hover:text-[#F40C3F] cursor-pointer xl:text-xl">
              Past speakers
            </div>
            <div className="hover:text-[#F40C3F] cursor-pointer xl:text-xl">
              Past sponsors
            </div>
            <div className="hover:text-[#F40C3F] cursor-pointer xl:text-xl">
              Past Investors
            </div>
            <div>
              <div className="flex-row w-fit xl:gap-4 gap-3 hidden lg:flex">
                <div className="flex flex-row justify-center items-center border-2 border-[#F40C3F] rounded-lg xl:p-2 group hover:cursor-pointer p-1">
                  <div className="flex items-center justify-between transform transition-transform duration-300 group-hover:translate-x-1">
                    <button>Log in</button>
                    <Image src={Right} className="h-[1.05rem] w-5" />
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center group bg-[#F40C3F] xl:p-2 p-1 rounded-lg pl-3">
                  <div className="flex items-center justify-between transform transition-transform duration-300 group-hover:translate-x-1">
                    <button>Register</button>
                    <Image src={Right} className="h-[1.05rem] w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
  <div
    className={`fixed top-20 z-50 w-full h-[calc(100vh-5rem)] bg-black md:hidden flex flex-col gap-[0.1rem]
    justify-center items-center font-poppins opacity-95`}
  >
    {[
      "HOME",
      "EVENTS",
      "ABOUT US",
      "PAST SPEAKERS",
      "PAST SPONSORS",
      "PAST INVESTORS",
    ].map((item, index) => (
      <div
        key={index}
        className={`w-[95%] h-16 bg-[#F40C3F] flex justify-center items-center text-xl
        transform transition-transform duration-150 ease-out hover:scale-105`}
      >
        {item}
      </div>
    ))}
  </div>
)}

    </>
  );
}

export default Navbar;
