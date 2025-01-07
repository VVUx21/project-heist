import React from "react";
import "./Speakers.css";
import Image from "next/image";
import { speakersData } from "../../Data/SpeakersData";
const Speakers = () => {
  return (
    <div className="bg-black" id="Speakers">
      <div className="text-center text-3xl sm:text-4xl text-white md:text-5xl lg:text-6xl font-extrabold font-bigger  mb-4">
        <p>
          PAST{" "}
          <span className="text-black gradient pt-[7.5px] pl-2 pr-2 ">
            SPEAKERS
          </span>
        </p>
      </div>
      <div className="w-full">
        <section className="max-w-6xl mx-auto sm:px-6 lg:px-4  flex flex-col justify-center items-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center">
            {speakersData.map((team, index) => (
              <div
                key={team.id}
                className=" mx-auto overflow-hidden flex flex-col w-96 justify-center items-center"
              >
                <div>
                  <Image
                    className="object-center object-cover h-auto w-full rounded-lg"
                    src={team.image}
                    alt={team.alt}
                    width={500}
                    height={500}
                    layout="fixed"
                  />
                </div>
                <div className="pt-2 py-8 sm:py-4 w-full font-poppins">
                  <p className="text-xl sm:text-2xl md:text-3xl  text-white font-semibold text-center ">
                    {team.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Speakers;
