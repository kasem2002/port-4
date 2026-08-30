import { Route, Routes } from "react-router-dom";
import AuthGate from "@/dashboard/AuthGate";
import DashboardLayout from "@/dashboard/DashboardLayout";
import Overview from "@/dashboard/Overview";
import AboutEditor from "@/dashboard/editors/AboutEditor";
import BrandEditor from "@/dashboard/editors/BrandEditor";
import ContactEditor from "@/dashboard/editors/ContactEditor";
import FooterEditor from "@/dashboard/editors/FooterEditor";
import HeroEditor from "@/dashboard/editors/HeroEditor";
import MarqueeEditor from "@/dashboard/editors/MarqueeEditor";
import NavEditor from "@/dashboard/editors/NavEditor";
import PartnersEditor from "@/dashboard/editors/PartnersEditor";
import ProcessEditor from "@/dashboard/editors/ProcessEditor";
import ProjectsEditor from "@/dashboard/editors/ProjectsEditor";
import ServicesEditor from "@/dashboard/editors/ServicesEditor";
import TrustEditor from "@/dashboard/editors/TrustEditor";
import InquiriesView from "@/dashboard/submissions/InquiriesView";
import SubmissionsView from "@/dashboard/submissions/SubmissionsView";

export default function Dashboard() {
  return (
    <AuthGate>
      <DashboardLayout>
        <Routes>
          <Route index element={<Overview />} />
          <Route path="submissions" element={<SubmissionsView />} />
          <Route path="inquiries" element={<InquiriesView />} />

          <Route path="brand" element={<BrandEditor />} />
          <Route path="nav" element={<NavEditor />} />
          <Route path="footer" element={<FooterEditor />} />

          <Route path="hero" element={<HeroEditor />} />
          <Route path="marquee" element={<MarqueeEditor />} />
          <Route path="trust" element={<TrustEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="services" element={<ServicesEditor />} />
          <Route path="process" element={<ProcessEditor />} />
          <Route path="projects" element={<ProjectsEditor />} />
          <Route path="partners" element={<PartnersEditor />} />
          <Route path="contact" element={<ContactEditor />} />
        </Routes>
      </DashboardLayout>
    </AuthGate>
  );
}
