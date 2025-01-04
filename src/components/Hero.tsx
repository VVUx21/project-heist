"use client"
import Image from "next/image"
import "./Hero.css"
import { useEffect, useState, useRef } from "react"
import Typo2 from "../assetsHero/typo2.png"
import Mask from "../assetsHero/mask.png"
import Mask2 from "../assetsHero/masksm.png"
import Wave from "../assetsHero/wave.png"
import Typo from "../assetsHero/typo.png"
import { ChevronRight } from 'lucide-react'
import { useSession } from "next-auth/react"
import Link from "next/link"
import { signOut } from "next-auth/react"

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const [maskScrollPosition, setMaskScrollPosition] = useState(0)
  const maskRef = useRef<HTMLDivElement>(null);
  const { data: session} = useSession()

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 5) % 200)
    }, 50)

    const handleScroll = () => {
      if (maskRef.current) {
        const scrollY = window.scrollY;
        const maskTop = maskRef.current.offsetTop;
        if (scrollY > maskTop - window.innerHeight) {
          setMaskScrollPosition((scrollY - (maskTop - window.innerHeight)) * 0.5);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (

    <main className="relative overflow-hidden flex flex-col" id="Hero">
      <div className="h-[90vh] sm:h-[90vh] md:h-[70vh] lg:h-[72.75vh]  bg-[#F40C3F] relative overflow-hidden flex flex-col">

        
        <div className="max-w-[1920px]">
          <Image
            src={Wave}
            alt="Background pattern"
            width={1920}
            height={150}
            className="w-full h-28 sm:h-24 md:h-28 lg:h-32 z-20"
            priority
          />
        </div>

        <div className="pb-2">
        <div className="relative overflow-hidden border-y-[1px] border-black">
        <div 
          className="whitespace-nowrap py-[4px] text-black/80 font-mono text-[12px] animate-scroll"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {[...Array(20)].map((_, i) => (
            <span key={i} className="inline-block px-2">
              31 JAN - 2 FEB, 2025
              <span className="opacity-60">{`////////////////////`}</span>
            </span>
          ))}
        </div>
      </div>
      </div>

        <div className=" -z-3 w-full max-w-[500px] md:max-w-[800px] mx-auto py-2 px-10">
          <Image
            src={isLargeScreen ? Typo : Typo2}
            alt="NES 2025"
            width={isLargeScreen ? 1800 : 800}
            height={isLargeScreen ? 500 : 150}
            className={`${
              isLargeScreen
                ? "w-[1800px] h-[500px] sm:w-[800px] sm:h-[150px]"
                : "w-[290px] h-[190px] sm:w-[350px] sm:h-[250px] md:w-[600px] md:h-[200px] lg:w-[700px] lg:h-[250px] xl:w-[900px] xl:h-[300px]"
            }`}          
            priority
          />
        </div> 

        <div className="pt-2">
        <div className="relative overflow-hidden border-y-[1px] border-black">
        <div 
          className="whitespace-nowrap py-[4px] text-black/80 font-mono text-[12px] animate-scroll"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {[...Array(20)].map((_, i) => (
            <span key={i} className="inline-block px-2">
              31 JAN - 2 FEB, 2025
              <span className="opacity-60">{`////////////////////`}</span>
            </span>
          ))}
        </div>
      </div>
      </div>

        <div className="relative flex-grow flex flex-col items-start sm:items-center justify-center px-10 sm:px-10 md:px-20 lg:px-20 py-2">
          <div className="flex flex-col sm:flex-row gap-3 z-2">
            {
              session?.user.isVerified? (
                <button
                  className="group bg-black duration-300 text-white px-6 py-2 text-base font-bold w-[230px] sm:w-[160px] h-[40px] sm:h-auto border-2 border-black relative flex items-center justify-center"
                >
                  <Link href={`/`}>
                  REGISTER
                  </Link>
                  <ChevronRight className="w-4 h-4 text-white ml-1 transition-transform duration-300 group-hover:translate-x-3" />
                </button>
              ):(
                <button 
              className="group bg-black duration-300 text-white px-6 py-2 text-base font-bold w-[230px] sm:w-[160px] h-[40px] sm:h-auto border-2 border-black relative flex items-center justify-center"
            >
                <Link href={`/`}>
                  REGISTER
                </Link>
              <ChevronRight className="w-4 h-4 text-white ml-1 transition-transform duration-300 group-hover:translate-x-3" />
            </button>
              )
            }
            {
              session?.user.isVerified?(
                <button
                onClick={()=> signOut()}
              className="group bg-transparent duration-300 text-white px-6 py-2 text-base font-bold w-[230px] sm:w-[160px] h-[40px] sm:h-auto border-2 border-black relative flex items-center justify-center"
            >
              <span>LOGOUT</span>
              <ChevronRight className="w-4 h-4 text-white ml-1 transition-transform duration-300 group-hover:translate-x-3" />
            </button>
              ):(
                <button 
              className="group bg-transparent duration-300 text-white px-6 py-2 text-base font-bold w-[230px] sm:w-[160px] h-[40px] sm:h-auto border-2 border-black relative flex items-center justify-center"
            >
              <Link href={`/`}>
                  LOGIN
                </Link>
              <ChevronRight className="w-4 h-4 text-white ml-1 transition-transform duration-300 group-hover:translate-x-3" />
            </button>
              )
            }
          </div>
        </div>
      </div>

      <div className="bg-[#F40C3F] mt-auto overflow-hidden" ref={maskRef}>
        <div 
          className="whitespace-nowrap"
          style={{
            transform: `translateX(-${maskScrollPosition % 100}%)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="inline-block w-full">
              <Image
                src={isLargeScreen ? Mask : Mask2}
                alt="NES 2025"
                width={isLargeScreen ? 1800 : 800}
                height={isLargeScreen ? 500 : 150}
                className={`${
                  isLargeScreen
                    ? "w-full h-[500px] sm:h-[450px] md:h-[275px] lg:h-[275px] xl:h-[250px]"
                    : "w-full h-[275px] sm:w-[800px] sm:h-[330px] md:h-[300px] lg:h-[350px] xl:h-[400px]"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
