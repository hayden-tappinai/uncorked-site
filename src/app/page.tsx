import ScrollVideo from "@/components/ScrollVideo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Wines from "@/components/Wines";
import Experience from "@/components/Experience";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <Hero />
      <ScrollVideo />
      <About />
      <Wines />
      <Experience />
      <Pricing />
      <Footer />
    </SmoothScroll>
  );
}
