"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Group from "../../public/Group.svg";
import Right from "../../public/arrow_forward_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useSession, getSession } from "next-auth/react"
import Link from "next/link";
import { signOut } from "next-auth/react"

function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session} = useSession()
  //console.log(session);
  return (
    <>
      <div className="m-0 p-0 w-full h-20 bg-black">
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
          <div className="md:flex flex-row h-max lg:w-[85%] md:w-[90%] gap-6 items-center justify-end hidden">
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
              <div className="flex-row w-fit gap-4 hidden lg:flex">
                <div className="flex flex-row justify-center items-center border-2 border-[#F40C3F] rounded-lg p-2 group hover:cursor-pointer">
                  <div className="flex items-center justify-between transform transition-transform duration-300 group-hover:translate-x-1">
                    {
                      session?.user.isVerified ? (
                        <button
                          type="button"
                          onClick={()=>signOut()}
                        >Log out</button>
                      ) : (
                        <Link href={`/login`}>Log in</Link>
                      )
                    }
                    <Image src={Right} className="h-[1.05rem] w-5" />
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center group bg-[#F40C3F] p-2 rounded-lg pl-3">
                  <div className="flex items-center justify-between transform transition-transform duration-300 group-hover:translate-x-1">
                    {
                      session?.user.isVerified? (
                        <button>Register</button>
                      ) : (
                        <Link href={`/login`}>Register</Link>
                      )
                    }
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
    className={`absolute z-10 w-full h-[calc(100vh-5rem)] bg-black md:hidden flex flex-col gap-[0.1rem]
    justify-center items-center`}
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
