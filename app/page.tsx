import Background from "@/components/landing/Background";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import Projects from "@/components/landing/Projects";
import Skills from "@/components/landing/Skills";
import About from "@/components/landing/About";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";

export default function Home() {
  return (
    <>
      <Background />
      <main>
        <Hero />
        <TrustStrip />
        <Projects />
        <Skills />
        <About />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
