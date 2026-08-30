import { Route, Routes } from 'react-router-dom';
import AuthGate from '../dashboard/AuthGate.jsx';
import DashboardLayout from '../dashboard/DashboardLayout.jsx';
import Overview from '../dashboard/Overview.jsx';
import BrandEditor from '../dashboard/editors/BrandEditor.jsx';
import NavEditor from '../dashboard/editors/NavEditor.jsx';
import HeroEditor from '../dashboard/editors/HeroEditor.jsx';
import MarqueeEditor from '../dashboard/editors/MarqueeEditor.jsx';
import TrustEditor from '../dashboard/editors/TrustEditor.jsx';
import AboutEditor from '../dashboard/editors/AboutEditor.jsx';
import ServicesEditor from '../dashboard/editors/ServicesEditor.jsx';
import ProcessEditor from '../dashboard/editors/ProcessEditor.jsx';
import ProjectsEditor from '../dashboard/editors/ProjectsEditor.jsx';
import PartnersEditor from '../dashboard/editors/PartnersEditor.jsx';
import ContactEditor from '../dashboard/editors/ContactEditor.jsx';
import FooterEditor from '../dashboard/editors/FooterEditor.jsx';

export default function Dashboard() {
  return (
    <AuthGate>
      <DashboardLayout>
        <Routes>
          <Route index element={<Overview />} />
          <Route path="brand" element={<BrandEditor />} />
          <Route path="nav" element={<NavEditor />} />
          <Route path="hero" element={<HeroEditor />} />
          <Route path="marquee" element={<MarqueeEditor />} />
          <Route path="trust" element={<TrustEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="services" element={<ServicesEditor />} />
          <Route path="process" element={<ProcessEditor />} />
          <Route path="projects" element={<ProjectsEditor />} />
          <Route path="partners" element={<PartnersEditor />} />
          <Route path="contact" element={<ContactEditor />} />
          <Route path="footer" element={<FooterEditor />} />
        </Routes>
      </DashboardLayout>
    </AuthGate>
  );
}
