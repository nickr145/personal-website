// src/app.tsx
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Projects } from "./components/projects";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import InteractiveParticleCanvas from "./components/particlePlayground";

export function App() {
  return (
    <div class="min-h-screen bg-white text-gray-900 data-[theme=dark]:bg-gray-950 data-[theme=dark]:text-gray-100">
      <Header />

      {/* Keep Hero in the normal content flow */}
      <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
      </main>

      {/* Full-bleed interactive section */}
      <div className="mx-auto my-12">
        <InteractiveParticleCanvas width={720} height={420} />
      </div>

      {/* Back to constrained content */}
      <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
