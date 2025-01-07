'use client';
import Image from 'next/image';
import React from 'react';
import { eventsData } from '@/data/eventData';
import { useSession, getSession } from "next-auth/react";
import { toast } from "react-toastify";

interface Event {
  id: number;
  title: string;
  image: string;
  text: string;
}

function Events() {
  const { data: session} = useSession();

  const handleRegister = async (eventname: string) => {
    // Check if events array exists and if the event is already registered
    const existingEvents = session?.user.event || [];
    if (Array.isArray(existingEvents)) {
      const isAlreadyRegistered = existingEvents.map((name)=> name === eventname);
      if (isAlreadyRegistered) {
        toast.error(`You are already registered for the event: ${eventname}`);
        return;
      }
    }
  
    try {
      const response = await fetch(`/api/events`, {
        method: "POST",
        body: JSON.stringify({
          email: session?.user.email,
          eventname: eventname,
        }),
        headers: { "Content-type": "application/json" },
      });
  
      if (response.ok) {
        const json = await response.json();
        if (session?.user) {
          if (!session.user.event) {
            session.user.event = [];
          }
          session.user.event.push(eventname); // Push the string directly
        }
        
        toast.success("Registration Successful");
      } else {
        // Handle non-ok responses
        const errorData = await response.json();
        toast.error(errorData.message || "Registration Failed");
      }
    } catch (error) {
      toast.error("Registration Failed");
      console.error("Error occurred during registration:", error);
    }
  };
  
  return (
    <>
      <div className="flex flex-col items-center mx-1 bg-black" id='Events'>
        <div className="text-6xl tracking-wider font-bold font-bigger text-white mb-6 pt-10">EVENTS</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-20">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="group w-[320px] h-[370px] bg-[#F40C3F] text-white flex flex-col items-center justify-center border-4 border-bold border-white relative overflow-hidden"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-start transition-transform duration-500 group-hover:translate-y-[-100%]">
                <div className="text-3xl font-bold">{event.title}</div>
                <div>
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={320}
                    height={240}
                    className=""
                  />
                </div>
              </div>
          
              <div className="absolute inset-0 bg-[#A20000] flex flex-col justify-between p-7 border-solid border-3 border-[#F40C3F] transform translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0">
                <div className="text-3xl font-bold text-center">{event.title}</div>
                <div className="px-3 py-1 text-sm text-white">
                  {event.text}
                </div>
                <div className="flex justify-center gap-3">
                  <div className="bg-black text-white text-sm font-bold items-center flex justify-center px-4 cursor-pointer" onClick={()=>handleRegister(event.title)}>REGISTER ▶︎</div>
                  <div className="bg-transparent border-[0.5px] border-solid border-white text-sm text-white font-bold py-2 px-4 cursor-pointer"><a href={`/events/${event.title}`}>WEBSITE ▶︎</a></div>
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
