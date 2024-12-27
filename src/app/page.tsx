import Events from "../components/Events";
import Navbar from "../components/Navbar"
import AboutUs from"../components/AboutUs";
import Hero from "../components/Hero"
import Footer from "../components/Footer";
import Sponsors from "../components/Sponsors/Sponsors";
import Speakers from "../components/Speakers/Speakers";
import Investors from "../components/Investors/Investors";
export default function Home() {
  return (
   <>
   <Navbar />
   <Hero />
   <Events/>
   <AboutUs/>
   <Speakers/>
   <Sponsors/>
   <Investors/>
   <Footer />
   </>
  );
}
