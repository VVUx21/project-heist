"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-[#420D0D] rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white-800 mb-6">
          Welcome to NES
        </h1>
        <p className="text-center text-white-600 mb-8">
          Sign in to access your account
        </p>
        <button
          onClick={() =>
            signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_URL! })
          }
          className="flex items-center justify-center w-full px-4 py-3 bg-white text-black font-semibold rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300"
        >
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 48 48"
          >
            <defs>
              <path
                id="a"
                d="M44.5 20H24v8.5h11.8C33.4 34.4 28.4 37 24 37c-7 0-13-6-13-13s6-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.4 4.7 29.5 3 24 3 11.8 3 2 12.8 2 25s9.8 22 22 22c11 0 20.3-7.8 22-18v-9z"
              ></path>
            </defs>
            <clipPath id="b">
              <use xlinkHref="#a" overflow="visible"></use>
            </clipPath>
            <path
              clipPath="url(#b)"
              fill="#FBBC05"
              d="M0 37V11l17 13z"
            ></path>
            <path
              clipPath="url(#b)"
              fill="#EA4335"
              d="M0 11l17 13 7-6.1L48 14V0H0z"
            ></path>
            <path
              clipPath="url(#b)"
              fill="#34A853"
              d="M0 37l30-23 7.9 1L48 0v48H0z"
            ></path>
            <path
              clipPath="url(#b)"
              fill="#4285F4"
              d="M48 48L17 24l-4-3 35-10z"
            ></path>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
