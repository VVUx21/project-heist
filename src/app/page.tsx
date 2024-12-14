import Image from "next/image";
import Events from "@/components/Events";
import Navbar from "../components/Navbar"
import AboutUs from"@/components/AboutUs";
import Hero from "../components/Hero"
import Footer from "@/components/footer";
export default function Home() {
  return (
   <>
   <Navbar />
   <Hero />
   <AboutUs/>
   <Events/>
   <Footer />
   </>
  );
}
