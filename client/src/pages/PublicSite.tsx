import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Partners from "@/components/Partners";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import { useSiteContent } from "@/hooks/useSiteContent";
import { finishLoader } from "@/store/uiSlice";

export default function PublicSite() {
  const loaderDone = useAppSelector((s) => s.ui.loaderDone);
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useSiteContent();

  // The loader covers the intro animation, but never outlives the fetch — it
  // clears once content has arrived and the minimum beat has passed.
  useEffect(() => {
    if (loaderDone || isLoading) return;
    const timer = setTimeout(() => dispatch(finishLoader()), 1200);
    return () => clearTimeout(timer);
  }, [dispatch, loaderDone, isLoading]);

  if (isError) return <ContentUnavailable />;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper-50 text-ink-900 antialiased">
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

/** Shown when the API can't be reached at all — usually the server is down. */
function ContentUnavailable() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper-50 px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-brand-orange">
          PORT-4
        </p>
        <h1 className="mt-4 font-display text-3xl tracking-tighter2 text-ink-950">
          We couldn&rsquo;t load the site right now
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
          The content service isn&rsquo;t responding. Please refresh in a moment.
        </p>
      </div>
    </div>
  );
}
