import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicSite from './routes/PublicSite.jsx';
import Dashboard from './routes/Dashboard.jsx';
import Discovery from './routes/Discovery.jsx';

export default function App() {
  const lang = useSelector((s) => s.i18n.lang);

  // Apply direction + lang attribute to <html> whenever language changes.
  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/discovery" element={<Discovery />} />
      <Route path="/brief" element={<Discovery />} />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}
