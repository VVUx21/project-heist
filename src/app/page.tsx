import Image from "next/image";
import Events from "@/components/Events";
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
export default function Home() {
  return (
   <>
   <Navbar />
   <Hero />
   <Events/>
   </>
  );
}
