// pages/about.js
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className=" flex flex-col items-center pt-10 md:pb-20 pb-14 h-full bg-black text-white p-4 text-center" id="About Us">
      <Image
      src='/Group 3.png'
      alt='Group 3'
      width={200}
      height={200}
      className="mb-4"
      />
      <div className="font-editor max-w-6xl md:text-xl text-sm sm:text-lg  px-6 md:px-14 text-center leading-relaxed">
        <p className="pl-3 md:pl-0 font-editor">
          The National Entrepreneurship Summit is</p><p className="md:text-inherit">an initiative by Entrepreneurship Cell, NIT
          Rourkela to bridge the gap between students and their dream to become entrepreneurs.
          Started in 2013, NES today has become a platform for learning and interaction between
          the students, entrepreneurs, faculties, industry leaders and business experts from across
          the world. This time not only there would be a mix of keynote talks, guest lectures,
          workshops, video conferences, start-up camps, panel discussions but also several other
          interesting events both online and offline to evolve the thinking abilities of a</p><p>budding
          entrepreneur to superlative dimensions.</p>
      </div>
    </div>
  );
};

export default AboutUs;
