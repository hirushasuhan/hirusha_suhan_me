import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Designs } from "@/components/sections/designs";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-black">
      <Hero />
      <About />
      <Projects />
      <Designs />
      <Contact />
    </main>
  );
}
