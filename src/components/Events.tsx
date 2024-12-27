'use client';
import Image from 'next/image';
import React from 'react';
import { eventsData } from '@/data/eventData';

interface Event {
  id: number;
  title: string;
  image: string;
  text: string;
}

function Events() {
  return (
    <>
      <div className="flex flex-col items-center mx-1" id='Events'>
        <div className="text-5xl tracking-wider font-bold font-bigger mb-6 p-4">EVENTS</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-20">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="group w-[320px] h-[370px] bg-[#F40C3F] text-white flex flex-col items-center justify-center border-4 border-bold border-white relative overflow-hidden"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 group-hover:translate-y-[-100%]">
                <div className="text-3xl font-bold mt-4">{event.title}</div>
                <div>
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={320}
                    height={240}
                    className="rounded-md"
                  />
                </div>
              </div>
          
              <div className="absolute inset-0 bg-[#A20000] flex flex-col justify-between p-7 border-solid border-3 border-[#F40C3F] transform translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0">
                <div className="text-3xl font-bold text-center">{event.title}</div>
                <div className="px-3 py-1 text-sm text-white">
                  {event.text}
                </div>
                <div className="flex justify-center gap-3">
                  <div className="bg-black text-white text-sm font-bold items-center flex justify-center px-4 cursor-pointer"><a href='./'>REGISTER ▶︎</a></div>
                  <div className="bg-transparent border-[0.5px] border-solid border-white text-sm text-white font-bold py-2 px-4 cursor-pointer"><a href='./'>RULEBOOK ▶︎</a></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
