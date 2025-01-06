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
            {
              ['Events','About Us','Speakers', 'Sponsors','Investors'].map(
                (item, index) => (
                  <Link key={index} href={`#${item}`} className="hover:text-[#F40C3F] text-white cursor-pointer xl:text-xl">
                    {item}
                  </Link>
                )
              )
            }
            <div>
              <div className="flex-row w-fit xl:gap-4 gap-3 hidden lg:flex">
                <div className="flex flex-row justify-center items-center border-2 border-[#F40C3F] rounded-lg xl:p-2 group hover:cursor-pointer p-1">
                  <div className="flex items-center text-white justify-between transform transition-transform duration-300 group-hover:translate-x-1">
                    {
                      session?.user.isVerified ? (
                        <button
                          type="button"
                          onClick={()=>signOut()}
                        >Log out</button>
                      ) : (
                        <Link href={`/sign-in`}>Log in</Link>
                      )
                    }
                    <Image src={Right} className="h-[1.05rem] w-5" />
                  </div>
                </div>
                <div className={`flex flex-row justify-center items-center group bg-[#F40C3F] xl:p-2 p-1 ${session?.user.isVerified ?'rounded-full':'rounded-lg'} pl-3`}>
                  <div className="flex items-center justify-between">
                    {
                      session?.user.isVerified? (
                        <button className="h-8 w-8 rounded-xl">
                        <Image 
                          src="https://res.cloudinary.com/dnw1mcx2h/image/upload/v1734109550/ouyss7092bsvsvlvrkan.png" 
                          alt="Button Icon"
                          width={32} // Match the width of the button
                          height={32} // Match the height of the button
                          className="rounded-xl" // Optional, ensures alignment with the button styling
                        />
                      </button>
                      ) : (
                        <div className="group-hover:translate-x-1 flex flex-row justify-center items-center transform transition-transform duration-300">
                        <Link href={`/login`}>Register</Link>
                        <Image src={Right} className="h-[1.05rem] w-5" />
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
  <div
    onClick={() => setOpen(!open)}
    className={`fixed top-20 z-50 w-full h-[calc(100vh-5rem)] bg-black md:hidden flex flex-col gap-[0.1rem]
    justify-center items-center font-poppins opacity-95`}
  >
    {[
      'Events','About Us','Speakers', 'Sponsors','Investors'
    ].map((item, index) => (
      <div
        key={index} 
        className={`w-[95%] h-16 bg-[#F40C3F] flex justify-center items-center text-xl
        transform transition-transform duration-150 ease-out hover:scale-105`}
      >
      <Link onClick={() => setOpen(!open)} key={index} href={`#${item}`}>
        {item}
      </Link>
      </div>
    ))}
  </div>
)}

    </>
  );
}

export default Navbar;
