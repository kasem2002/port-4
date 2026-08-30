import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useLang } from "@/hooks/useLocalized";
import PublicSite from "@/pages/PublicSite";

// The dashboard and the discovery form are separate audiences, so they load
// as their own chunks — a client opening the brief never downloads the admin UI.
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Discovery = lazy(() => import("@/pages/Discovery"));

export default function App() {
  const lang = useLang();

  // Keep <html lang> and direction in step with the active language.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/brief" element={<Discovery />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </Suspense>
  );
}

/** Shown only for the moment a lazy route chunk is in flight. */
function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper-50">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-500">
        Loading…
      </span>
    </div>
  );
}
