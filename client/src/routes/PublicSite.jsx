import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { finishLoader } from '../store/uiSlice.js';

import Loader from '../components/Loader.jsx';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Stats from '../components/Stats.jsx';
import About from '../components/About.jsx';
import Services from '../components/Services.jsx';
import Process from '../components/Process.jsx';
import Projects from '../components/Projects.jsx';
import Partners from '../components/Partners.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

export default function PublicSite() {
  const loaderDone = useSelector((s) => s.ui.loaderDone);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loaderDone) return;
    const t = setTimeout(() => dispatch(finishLoader()), 1600);
    return () => clearTimeout(t);
  }, [dispatch, loaderDone]);

  return (
    <div className="relative min-h-screen bg-paper-50 text-ink-900 antialiased overflow-x-hidden">
      <Loader visible={!loaderDone} />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Partners />
        <About />
        <Services />
        <Process />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
