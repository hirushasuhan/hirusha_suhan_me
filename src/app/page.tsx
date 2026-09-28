import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Designs } from "@/components/sections/designs";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col overflow-x-clip">
      <Hero />
      <About />
      <Projects />
      <Designs />
      <Faq />
      <Contact />
    </main>
  );
}
