import LangToggle from "@/components/LangToggle";
import Logo from "@/components/Logo";
import SocialIcon from "@/components/SocialIcon";
import { useL, useT } from "@/hooks/useLocalized";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function Footer() {
  const { content } = useSiteContent();
  const l = useL();
  const t = useT();
  const year = new Date().getFullYear();

  const settings = content?.settings;
  const nav = content?.nav ?? [];
  const social = content?.social ?? [];
  const services = content?.services ?? [];

  return (
    <footer className="relative border-t border-ink-900/10 bg-paper-50">
      <div className="container-p4 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <Logo className="h-9" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-600">
              {l(settings, "footerAboutBlurb")}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {social.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l(link, "label")}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 text-ink-800 transition-colors hover:bg-ink-950 hover:text-paper-50"
                >
                  <SocialIcon
                    icon={link.icon}
                    className="h-4 w-4"
                    fallback={
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
                        {link.abbr}
                      </span>
                    }
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
              {t("footer.navigate")}
            </p>
            <ul className="space-y-2.5 text-[14.5px] text-ink-800">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="link-underline transition-colors hover:text-brand-orange"
                  >
                    {l(item, "label")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
              {t("footer.services")}
            </p>
            <ul className="space-y-2.5 text-[14.5px] text-ink-800">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="link-underline transition-colors hover:text-brand-orange"
                  >
                    {l(service, "title")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
              {t("footer.contact")}
            </p>
            <ul className="space-y-2.5 text-[14.5px] text-ink-800">
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="link-underline transition-colors hover:text-brand-orange"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.phone && <li className="text-ink-600">{settings.phone}</li>}
              <li className="text-ink-600">{l(settings, "location")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 select-none md:mt-24">
          <p
            className="font-display font-light leading-none tracking-[-0.06em] text-ink-950"
            style={{ fontSize: "clamp(4rem, 22vw, 20rem)" }}
          >
            PORT<span className="text-brand-orange">-</span>4
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-ink-900/10 pt-6 text-[12.5px] text-ink-500 md:flex-row md:items-center">
          <p>
            © {year} PORT-4. {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="link-underline hover:text-ink-900">
              {t("footer.privacy")}
            </a>
            <a href="#" className="link-underline hover:text-ink-900">
              {t("footer.terms")}
            </a>
            <LangToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
