"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const AboutData = [
  { title: "Attendee count", number: "25K+", icon: "/Events/icon1.png" },
  { title: "Venue", number: "NIT ROURKELA", icon: "/Events/icon2.png" },
  { title: "Investors count", number: "50+", icon: "/Events/icon3.png" },
];

const stallCategories = [
  {
    title: "BASIC",
    features: [
      "3m x 3m stall",
      "2 chair, 1 table",
      "1 electricity socket",
      "Fascia (name of the startup)",
      "Interaction with other Startups and Investors",
      "1 Company Poster"
    ],
  },
  {
    title: "PREMIUM",
    features: [
      "3m x 3m stall",
      "2 chair, 1 table",
      "1 electricity socket",
      "Fascia (name of the startup)",
      "Interaction with other Startups and Investors",
      "One Company Banner(Standee)+ 2 Company Posters",
      "LED Screens for display",
      "Product Video played every 15 minutes on the Main screen",
    ],
  }
];

const TimelineItem = ({ event, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(event.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [event.id]);

  return (
    <div
      id={event.id}
      className={`flex items-center justify-between transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div
        className={`p-6 rounded-lg shadow-lg w-full md:w-5/12 ${
          index % 2 === 0
            ? "bg-red-600 text-white md:ml-auto"
            : "bg-white text-red-600 md:mr-auto"
        } hover:scale-105 hover:shadow-xl transition-transform`}
      >
        <h3 className="text-xl font-extrabold mb-2">{event.date}</h3>
        <p className="text-lg">{event.description}</p>
      </div>
      {index <= 3 && (
        <div className="absolute w-1 h-full bg-red-600 left-1/2 -translate-x-1/2 hidden md:block"></div>
      )}
    </div>
  );
};

const Page = () => {
  const timelineData = [
    {
      date: "20 December 2024",
      description: "Registration Starts",
      id: "event1",
    },
    { date: "15 January 2025", description: "Teams Shortlisting & Due Diligence", id: "event2" },
    { date: "1-2 February 2025", description: "Shark Tank", id: "event3" },
    // { date: "29 January 2024", description: "Hackathon Day 2", id: "event4" },
  ];

  return (
    <>
      <Navbar />
      <section
        className={`relative w-full md:bg-[url("/Events/hero.webp")] lg:min-h-screen bg-cover bg-bottom flex flex-col justify-between items-center overflow-hidden`}
        // style={{ backgroundImage: 'url(")' }}
      >
        {/* Main Text */}
        <div className="flex flex-col items-center mt-[5rem] sm:mt-[4rem]">
          <h1 className="text-white flex  items-center lg:gap-5 gap-4 font-bigger tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase">
            Shark
            <span className="bg-red-800 text-white lg:px-6 px-4 lg:pt-3 pt-2 rounded-lg text-shadow flex justify-center items-center">
              Tank
            </span>
          </h1>
        </div>

        {/* Center Register Button */}
        <div className="mb-[4rem] mt-10">
          <Link className="px-6 py-3 bg-red-900 text-white font-bold text-lg rounded-lg shadow-md hover:bg-red-700 transition duration-300" href="/register/shark-tank">
            Register
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-96 bg-[url('/Events/about_bg.png')] bg-cover bg-center">
        <div className="flex flex-col items-center pt-10 pb-14 md:pb-20 text-white text-center p-4">
          <Image
            src="/Group 3.png"
            alt="Group 3"
            width={200}
            height={200}
            className="mb-4"
          />
          <div className="max-w-6xl text-sm sm:text-lg md:text-xl leading-relaxed px-6 md:px-14">
            <p className="uppercase">
              GET READY FOR PRODUCT TESTING AND MASS NETWORKING
            </p>
            <p className="mt-5">
              Shark Tank is an exhibition event for startups that draws
              participants, speakers, investors, and organisations from all
              around India. Startups will have a fantastic platform to share
              their cutting-edge innovations and join a supportive community.{" "}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 mt-10">
            {AboutData.map((item, index) => (
              <div
                key={index}
                className="text-center flex flex-col items-center"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={100}
                  height={100}
                />
                <div className="flex flex-col items-center mt-4">
                  <h2 className="text-2xl font-bold">{item.number}</h2>
                  <p className="text-lg font-semibold text-red-600">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        className={`text-white py-16 px-6 bg-[url("/Events/timeline.jpg")] bg-cover bg-center`}
      >
        <h2 className="text-6xl font-extrabold font-bigger uppercase text-center pb-10 tracking-wider">
          TIME <span className="text-red-600">LINE</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {timelineData.map((event, index) => (
            <TimelineItem key={event.id} event={event} index={index} />
          ))}
        </div>
      </section>

      {/* Stall Categories Section */}
      <section className="bg-black py-16 px-5 lg:px-28 text-white">
        <h2 className="text-6xl font-bigger font-extrabold uppercase text-center mb-10 tracking-wider">
          Stalls <span className="text-red-600">Category</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {stallCategories.map((category, index) => (
            <div
              key={index}
              className="p-6 bg-gray-900 border border-gray-600 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold uppercase text-red-600 text-center mb-4">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
