import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Projects />
        <Skills />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
