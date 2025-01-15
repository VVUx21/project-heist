"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Group from "../../public/Group.svg";
import Right from "../../public/arrow_forward_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { signIn,signOut } from "next-auth/react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  //console.log(session);
  return (
    <>
      <div className="m-0 p-0 w-full h-20 bg-black top-0 z-50 sticky opacity-95">
        <div className="flex flex-row justify-between w-full items-center p-6 md:pr-0 lg:pr-6">
          <Link href="/">
            <Image src={Group} className="w-20 h-9" />
          </Link>
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
            {["Home","Events", "About Us", "Speakers", "Sponsors", "Investors"].map(
              (item, index) => (
                <Link
                  key={index}
                  href={`#${item}`}
                  className="hover:text-[#F40C3F] text-white cursor-pointer xl:text-xl"
                >
                  {item}
                </Link>
              )
            )}
            <div>
              <div className="flex-row w-fit xl:gap-4 gap-3 hidden lg:flex">
                {/* <div className="flex flex-row justify-center items-center border-2 border-[#F40C3F] rounded-lg xl:p-2 group hover:cursor-pointer p-1">
                  <div className="flex items-center text-white justify-between transform transition-transform duration-300 group-hover:translate-x-1">
                    
                    <Image src={Right} className="h-[1.05rem] w-5" />
                  </div>
                </div> */}
                {session?.user.isVerified ? (
                      <button type="button" onClick={() => signOut()}>
                        Log out
                      </button>
                    ) : (
                      <button
                      onClick={handleGoogleSignIn}
                      className="flex flex-row justify-center items-center group bg-[#F40C3F] xl:p-2 p-1 rounded-lg pl-3"
                    >
                      <div className="flex items-center gap-2 text-white justify-between transform transition-transform duration-300 group-hover:translate-x-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Sign in with Google
                        <Image src={Right} alt="arrow" className="h-[1.05rem] w-5" />
                      </div>
                    </button>
                    )}
                {/* <div className="flex flex-row justify-center items-center group bg-[#F40C3F] xl:p-2 p-1 rounded-lg pl-3">
                  <div className="flex items-center justify-between transform transition-transform duration-300 group-hover:translate-x-1">
                    {session?.user.isVerified ? (
                      <button>Register</button>
                    ) : (
                      <Link href={`/login`}>Register</Link>
                    )}
                    <Image src={Right} className="h-[1.05rem] w-5" />
                  </div>
                </div> */}
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
          {["Home","Events", "About Us", "Speakers", "Sponsors", "Investors"].map(
            (item, index) => (
              <div
                key={index}
                className={`w-[95%] h-16 bg-[#F40C3F] flex justify-center items-center text-xl
        transform transition-transform duration-150 ease-out hover:scale-105`}
              >
                <Link
                  onClick={() => setOpen(!open)}
                  key={index}
                  href={`#${item}`}
                >
                  {item}
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
