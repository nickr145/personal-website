// src/app.tsx
import { Header } from './components/header';
import { Hero } from './components/hero';
import { About } from './components/about';
import { Projects } from './components/projects';
import { Contact } from './components/contact';
import { Footer } from './components/footer';

export function App() {
  return (
    <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
